"use client";

import { memo } from "react";
import { shallow } from "@liveblocks/client";

import { 
  useOthersConnectionIds, 
  useOthersMapped
} from "@/liveblocks.config";
import { colorToCss } from "@/lib/utils";

import { Cursor } from "./cursor";
import { Path } from "./path";

const Cursors = () => {
  const ids = useOthersConnectionIds();  //similar to useOthers()

  return (
    <>
      {ids.map((connectionId) => (
        <Cursor
          key={connectionId}
          connectionId={connectionId}
        />
      ))}
    </>
  );
};
//For other users of room
const Drafts = () => {
  const others = useOthersMapped((other) => ({
    pencilDraft: other.presence.pencilDraft,
    penColor: other.presence.penColor,
  }), shallow);

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={other.penColor ? colorToCss (other.penColor) : "#000"}
            />
          );
        }

        return null;
      })}
    </>
  )
}

export const CursorsPresence = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
      {/* cursor movement */}
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";