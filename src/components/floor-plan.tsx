"use client";

import { useId } from "react";
import { motion, type MotionValue } from "framer-motion";

import {
  FLOOR_SIZE,
  ROOMS,
  polygonArea,
  polygonCentroid,
  type Floor,
  type Point,
  type Zone,
} from "@/content/museum";
import { cn } from "@/lib/utils";

const WALL = 0.32;

const ZONE_FILL: Record<Zone["kind"], string> = {
  room: "#2a2119",
  hall: "#3a3026",
  service: "#1d1a17",
  stairs: "#1d1a17",
  reception: "#33291f",
  hub: "#33291f",
};

const pts = (points: Point[]) => points.map(([x, y]) => `${x},${y}`).join(" ");

const pathFrom = (points: Point[]) =>
  points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ");

type FloorPlanProps = {
  floor: Floor;
  activeId?: string | null;
  hoverId?: string | null;
  onSelect?: (roomId: string) => void;
  onHover?: (roomId: string | null) => void;
  /** Compact mode hides small labels and areas (used by the mini-map). */
  compact?: boolean;
  /** Draws the route progressively, 0..1. */
  routeProgress?: number | MotionValue<number>;
  you?: Point | null;
  className?: string;
};

export function FloorPlan({
  floor,
  activeId,
  hoverId,
  onSelect,
  onHover,
  compact = false,
  routeProgress = 1,
  you,
  className,
}: FloorPlanProps) {
  const stairsPattern = `stairs-${useId().replace(/[^\w-]/g, "")}`;
  const pad = compact ? 0.5 : 1.4;
  const bottom = compact ? 0.9 : 2.8;
  const viewBox = `${-pad} ${-pad} ${FLOOR_SIZE + pad * 2} ${FLOOR_SIZE + pad + bottom}`;

  return (
    <svg
      viewBox={viewBox}
      className={cn("h-auto w-full select-none", className)}
      role="img"
      aria-label={`${floor.name} plan, ${FLOOR_SIZE} by ${FLOOR_SIZE} metres`}
    >
      <defs>
        <pattern id={stairsPattern} width="0.45" height="1" patternUnits="userSpaceOnUse">
          <line x1="0" y1="0" x2="0" y2="1" stroke="#6b5b48" strokeWidth="0.06" />
        </pattern>
      </defs>

      {floor.zones.map((zone) => {
        const room = ROOMS.find((r) => r.id === zone.id);
        const isRoom = zone.kind === "room" && room;
        const isActive = activeId === zone.id;
        const isHover = hoverId === zone.id;
        const [cx, cy] = zone.labelAt ?? polygonCentroid(zone.polygon);
        const area = polygonArea(zone.polygon);

        return (
          <g
            key={zone.id}
            className={cn(isRoom && onSelect && "cursor-pointer")}
            onClick={isRoom && onSelect ? () => onSelect(zone.id) : undefined}
            onMouseEnter={isRoom && onHover ? () => onHover(zone.id) : undefined}
            onMouseLeave={isRoom && onHover ? () => onHover(null) : undefined}
            onKeyDown={
              isRoom && onSelect
                ? (e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(zone.id);
                    }
                  }
                : undefined
            }
            tabIndex={isRoom && onSelect ? 0 : undefined}
            role={isRoom && onSelect ? "button" : undefined}
            aria-label={isRoom && room ? `Room ${room.number}: ${room.title}` : undefined}
          >
            <polygon
              points={pts(zone.polygon)}
              fill={ZONE_FILL[zone.kind]}
              stroke="#8a7760"
              strokeWidth={zone.kind === "room" ? 0.14 : 0.06}
            />
            {zone.kind === "stairs" && (
              <rect x={0.4} y={8.3} width={2.6} height={3.4} fill={`url(#${stairsPattern})`} />
            )}
            {isRoom && room && (
              <polygon
                points={pts(zone.polygon)}
                fill={room.accent}
                className="transition-opacity duration-300"
                opacity={isActive ? 0.55 : isHover ? 0.4 : 0.16}
              />
            )}

            {isRoom && room ? (
              <g pointerEvents="none">
                <circle cx={cx} cy={cy - (compact ? 0 : 1.1)} r={compact ? 0.9 : 0.62} fill={room.accent} />
                <text
                  x={cx}
                  y={cy - (compact ? 0 : 1.1)}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={compact ? 1.05 : 0.72}
                  fontWeight={700}
                  fill="#17110c"
                >
                  {room.number}
                </text>
                {!compact && (
                  <>
                    <Lines x={cx} y={cy + 0.05} lines={(zone.labelAr ?? room.titleAr).split("\n")} size={0.5} fill="#f1e6d4" className="font-ar" />
                    <Lines
                      x={cx}
                      y={cy + 0.05 + (zone.labelAr ?? "").split("\n").length * 0.62}
                      lines={zone.label.split("\n")}
                      size={0.42}
                      fill="#d8c7ad"
                    />
                    <text
                      x={cx}
                      y={cy + 0.05 + ((zone.labelAr ?? "").split("\n").length + zone.label.split("\n").length) * 0.62}
                      textAnchor="middle"
                      fontSize={0.36}
                      fill="#a8957b"
                    >
                      ≈ {area.toFixed(0)} m²
                    </text>
                  </>
                )}
              </g>
            ) : (
              !compact && (
                <text
                  x={cx}
                  y={cy}
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={zone.kind === "hall" || zone.kind === "reception" || zone.kind === "hub" ? 0.42 : 0.32}
                  fill="#a8957b"
                  pointerEvents="none"
                >
                  {zone.label}
                </text>
              )
            )}
          </g>
        );
      })}

      {/* Outer walls */}
      <rect
        x={-WALL / 2}
        y={-WALL / 2}
        width={FLOOR_SIZE + WALL}
        height={FLOOR_SIZE + WALL}
        fill="none"
        stroke="#d9c8ae"
        strokeWidth={WALL}
      />

      {/* Doors: punched through the walls in the hall colour */}
      {floor.doors.map(([a, b], i) => (
        <line
          key={i}
          x1={a[0]}
          y1={a[1]}
          x2={b[0]}
          y2={b[1]}
          stroke={ZONE_FILL.hall}
          strokeWidth={a[1] === FLOOR_SIZE || b[1] === FLOOR_SIZE ? WALL + 0.08 : 0.2}
          strokeLinecap="butt"
        />
      ))}

      {floor.id === 1 && !compact && (
        <path d="M0.9 14.9 Q 3.6 13.2 6.0 14.6" fill="none" stroke="#c9a46a" strokeWidth={0.22} strokeLinecap="round" />
      )}

      {/* Visitor route */}
      <motion.path
        d={pathFrom(floor.route)}
        fill="none"
        stroke="#c0392b"
        strokeWidth={compact ? 0.22 : 0.14}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={compact ? undefined : "0.4 0.28"}
        style={{ pathLength: routeProgress }}
        pointerEvents="none"
      />
      {!compact && (
        <RouteArrow from={floor.route[floor.route.length - 2]} to={floor.route[floor.route.length - 1]} />
      )}

      {floor.entrance && !compact && (
        <g pointerEvents="none">
          <path d={`M${floor.entrance[0]} ${FLOOR_SIZE + 1.2} l-0.35 0.55 h0.7 z`} fill="#d9c8ae" />
          <text x={floor.entrance[0]} y={FLOOR_SIZE + 2.5} textAnchor="middle" fontSize={0.38} fill="#d9c8ae">
            MAIN ENTRANCE · from the Citadel
          </text>
        </g>
      )}

      {you && (
        <motion.g
          initial={false}
          animate={{ x: you[0], y: you[1] }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
          pointerEvents="none"
        >
          <circle r={compact ? 1.4 : 0.9} fill="#ffffff" opacity={0.18}>
            <animate attributeName="r" values={compact ? "0.9;1.9;0.9" : "0.6;1.2;0.6"} dur="2s" repeatCount="indefinite" />
          </circle>
          <circle r={compact ? 0.6 : 0.36} fill="#ffffff" stroke="#c0392b" strokeWidth={0.14} />
        </motion.g>
      )}

      {!compact && <ScaleBar y={FLOOR_SIZE + 1.5} />}
      {!compact && <NorthArrow x={FLOOR_SIZE + 0.7} y={FLOOR_SIZE + 1.4} />}
    </svg>
  );
}

function Lines({
  x,
  y,
  lines,
  size,
  fill,
  className,
}: {
  x: number;
  y: number;
  lines: string[];
  size: number;
  fill: string;
  className?: string;
}) {
  return (
    <text x={x} y={y} textAnchor="middle" fontSize={size} fill={fill} className={className}>
      {lines.map((line, i) => (
        <tspan key={i} x={x} dy={i === 0 ? 0 : 0.62}>
          {line}
        </tspan>
      ))}
    </text>
  );
}

function RouteArrow({ from, to }: { from: Point; to: Point }) {
  // Rounded: Math.atan2 can differ in the last digit between Node and the browser,
  // which breaks hydration of the server-rendered transform attribute.
  const angle = Math.round((Math.atan2(to[1] - from[1], to[0] - from[0]) * 180) / Math.PI);
  return (
    <path
      d="M0 0 L-0.45 -0.25 L-0.45 0.25 Z"
      fill="#c0392b"
      transform={`translate(${to[0]} ${to[1]}) rotate(${angle})`}
      pointerEvents="none"
    />
  );
}

function ScaleBar({ y }: { y: number }) {
  const x0 = 10;
  return (
    <g pointerEvents="none" fill="#a8957b" fontSize={0.34}>
      <rect x={x0} y={y} width={2.5} height={0.18} fill="#d9c8ae" />
      <rect x={x0 + 2.5} y={y} width={2.5} height={0.18} fill="#6b5b48" />
      {[0, 2.5, 5].map((m) => (
        <text key={m} x={x0 + m} y={y + 0.75} textAnchor="middle">
          {m}
        </text>
      ))}
      <text x={x0 + 5.4} y={y + 0.75}>
        m
      </text>
    </g>
  );
}

function NorthArrow({ x, y }: { x: number; y: number }) {
  return (
    <g pointerEvents="none" transform={`translate(${x} ${y})`}>
      <path d="M0 -0.7 L0.3 0.3 L0 0.1 L-0.3 0.3 Z" fill="#d9c8ae" />
      <text y={0.95} textAnchor="middle" fontSize={0.36} fill="#d9c8ae">
        N
      </text>
    </g>
  );
}
