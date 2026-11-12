import type { Service } from "@/lib/services";
import styles from "./ServiceCube.module.css";

/*
 * "The Rubik's cube": an isometric 3×3 cube with one service per visible face.
 * Pure SVG, rendered on the server. Each face links to its service card.
 */

type Point = [number, number];

const S = 100; // edge length in SVG units
const COS30 = Math.cos(Math.PI / 6);

// The seven visible corners of an isometric cube centred on (0, 0).
const TOP: Point = [0, -S];
const UPPER_LEFT: Point = [-S * COS30, -S / 2];
const UPPER_RIGHT: Point = [S * COS30, -S / 2];
const CENTRE: Point = [0, 0];
const LOWER_LEFT: Point = [-S * COS30, S / 2];
const LOWER_RIGHT: Point = [S * COS30, S / 2];
const BOTTOM: Point = [0, S];

/**
 * A face is an origin plus two edge vectors: `u` runs along the text baseline,
 * `v` runs "down" the text. Everything on a face is drawn in a flat 0–100
 * square and mapped onto the cube with one SVG matrix transform.
 */
type Face = { origin: Point; u: Point; v: Point; tone: "top" | "left" | "right" };

const sub = (a: Point, b: Point): Point => [a[0] - b[0], a[1] - b[1]];

const FACES: Face[] = [
  // Top face: text reads left to right across the diamond.
  { origin: UPPER_LEFT, u: sub(TOP, UPPER_LEFT), v: sub(CENTRE, UPPER_LEFT), tone: "top" },
  // Left face: text slopes down toward the front edge.
  { origin: UPPER_LEFT, u: sub(CENTRE, UPPER_LEFT), v: sub(LOWER_LEFT, UPPER_LEFT), tone: "left" },
  // Right face: text climbs away from the front edge.
  { origin: CENTRE, u: sub(UPPER_RIGHT, CENTRE), v: sub(BOTTOM, CENTRE), tone: "right" },
];

const matrix = ({ origin, u, v }: Face) =>
  `matrix(${u[0] / 100} ${u[1] / 100} ${v[0] / 100} ${v[1] / 100} ${origin[0]} ${origin[1]})`;

// 3×3 stickers in the face's flat 0–100 space, with a small gap between them.
const GAP = 4;
const CELL = (100 - GAP * 4) / 3;
const STICKERS = [0, 1, 2].flatMap((row) =>
  [0, 1, 2].map((col) => ({
    x: GAP + col * (CELL + GAP),
    y: GAP + row * (CELL + GAP),
  })),
);

const OUTLINE = [TOP, UPPER_RIGHT, LOWER_RIGHT, BOTTOM, LOWER_LEFT, UPPER_LEFT]
  .map((p) => p.join(","))
  .join(" ");

export default function ServiceCube({ services }: { services: Service[] }) {
  const faces = services.slice(0, 3);

  return (
    <div className={styles.wrap}>
      <svg
        className={styles.cube}
        viewBox="-92 -106 184 212"
        role="group"
        aria-label="A cube with one service on each face. Select a face to jump to that service."
      >
        {faces.map((service, i) => {
          const face = FACES[i];
          // Long labels get a smaller size so they fit across one face.
          const fontSize = service.shortName.length > 6 ? 11.5 : 22;
          return (
            <a
              key={service.id}
              href={`#${service.id}`}
              className={`${styles.face} ${styles[face.tone]}`}
              aria-label={`Jump to ${service.name}`}
            >
              <g transform={matrix(face)}>
                <rect className={styles.base} width="100" height="100" />
                {STICKERS.map(({ x, y }) => (
                  <rect
                    key={`${x}-${y}`}
                    className={styles.sticker}
                    x={x}
                    y={y}
                    width={CELL}
                    height={CELL}
                    rx="3"
                  />
                ))}
                <text
                  className={styles.label}
                  x="50"
                  y="50"
                  fontSize={fontSize}
                  textAnchor="middle"
                  dominantBaseline="central"
                >
                  {service.shortName}
                </text>
              </g>
            </a>
          );
        })}

        {/* Gold edges: the outline plus the three edges meeting at the front corner. */}
        <g className={styles.edges} aria-hidden="true">
          <polygon points={OUTLINE} />
          <polyline points={`${UPPER_LEFT.join(",")} ${CENTRE.join(",")} ${UPPER_RIGHT.join(",")}`} />
          <line x1={CENTRE[0]} y1={CENTRE[1]} x2={BOTTOM[0]} y2={BOTTOM[1]} />
        </g>
      </svg>
      <p className={styles.caption}>Our Rubik&rsquo;s cube: three sides, one solution.</p>
    </div>
  );
}
