// "use client";
// import { Stage, Layer, Rect, Text, Transformer } from "react-konva";
// import { useRef, useEffect, useState } from "react";
// import Konva from "konva";

// const CanvaLikeTextEditor = () => {
//   const textRef = useRef<Konva.Text>(null);
//   const transformerRef = useRef<Konva.Transformer>(null);
//   const stageRef = useRef<Konva.Stage>(null);

//   const [isSelected, setIsSelected] = useState(false);
//   const [textValue, setTextValue] = useState("Double-click to edit me");
//   const [isEditing, setIsEditing] = useState(false); // track editing
//   const [stageSize, setStageSize] = useState({
//     width: typeof window !== "undefined" ? window.innerWidth : 800,
//     height: typeof window !== "undefined" ? window.innerHeight : 600,
//   });

//   const card = { x: 100, y: 50, width: 600, height: 400 };

//   // Stage resize
//   useEffect(() => {
//     const handleResize = () => {
//       setStageSize({ width: window.innerWidth, height: window.innerHeight });
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   // Transformer selection
//   useEffect(() => {
//     if (isSelected && transformerRef.current && textRef.current) {
//       transformerRef.current.nodes([textRef.current]);
//       transformerRef.current.getLayer()?.batchDraw();
//     }
//   }, [isSelected]);

//   const handleDoubleClick = () => {
//     const textNode = textRef.current;
//     if (!textNode) return;

//     const stage = textNode.getStage();
//     if (!stage) return;

//     setIsEditing(true); // hide the canvas text visually but keep it mounted

//     const textPosition = textNode.getClientRect();
//     const stageBox = stage.container().getBoundingClientRect();

//     // Create textarea overlay
//     const textarea = document.createElement("textarea");
//     document.body.appendChild(textarea);

//     textarea.value = textNode.text();
//     textarea.style.position = "absolute";
//     textarea.style.top = `${stageBox.top + textPosition.y}px`;
//     textarea.style.left = `${stageBox.left + textPosition.x}px`;
//     textarea.style.width = `${textPosition.width + 5}px`;
//     textarea.style.height = `${textPosition.height + 5}px`;
//     textarea.style.fontSize = `${textNode.fontSize()}px`;
//     textarea.style.fontFamily = textNode.fontFamily();
//     textarea.style.color = textNode.fill() as string;
//     textarea.style.border = "none";
//     textarea.style.padding = "0px";
//     textarea.style.margin = "0px";
//     textarea.style.overflow = "hidden";
//     textarea.style.background = "transparent";
//     textarea.style.outline = "none";
//     textarea.style.resize = "none";
//     textarea.style.lineHeight = `${textNode.lineHeight()}`;
//     textarea.style.whiteSpace = "pre-wrap";

//     textarea.focus();
//     textarea.select(); // select all for Ctrl+A

//     const removeTextarea = () => {
//       setTextValue(textarea.value);
//       document.body.removeChild(textarea);
//       setIsEditing(false); // show canvas text again
//     };

//     textarea.addEventListener("blur", removeTextarea);

//     textarea.addEventListener("keydown", (e) => {
//       if (e.key === "Enter" && !e.shiftKey) {
//         e.preventDefault();
//         textarea.blur();
//       }
//       if (e.key === "Escape") {
//         e.preventDefault();
//         textarea.blur();
//       }
//     });
//   };

//   return (
//     <Stage
//       width={stageSize.width}
//       height={stageSize.height}
//       ref={stageRef}
//     >
//       <Layer>
//         {/* Card */}
//         <Rect
//           x={card.x}
//           y={card.y}
//           width={card.width}
//           height={card.height}
//           fill="#f5f5f5"
//           stroke="#ccc"
//           strokeWidth={2}
//           cornerRadius={10}
//         />

//         {/* Draggable & Editable Text */}
//         <Text
//           ref={textRef}
//           text={textValue}
//           x={card.x + 20}
//           y={card.y + 20}
//           fontSize={24}
//           draggable
//           visible={!isEditing} // hide visually but keep mounted
//           onClick={() => setIsSelected(true)}
//           onDblClick={handleDoubleClick}
//           onDragMove={(e) => {
//             const node = e.target;
//             const newX = Math.max(
//               card.x,
//               Math.min(node.x(), card.x + card.width - node.width())
//             );
//             const newY = Math.max(
//               card.y,
//               Math.min(node.y(), card.y + card.height - node.height())
//             );
//             node.position({ x: newX, y: newY });
//           }}
//         />

//         {/* Transformer for resizing */}
//         {isSelected && <Transformer ref={transformerRef} />}
//       </Layer>
//     </Stage>
//   );
// };

// export default CanvaLikeTextEditor;




"use client";
import { Stage, Layer, Rect, Text, Transformer, Image as KonvaImage } from "react-konva";
import { useRef, useEffect, useState } from "react";
import Konva from "konva";

const CanvaLikeTextEditor = () => {
const textRef = useRef<Konva.Text>(null);
const transformerRef = useRef<Konva.Transformer>(null);
const stageRef = useRef<Konva.Stage>(null);

  const [isSelected, setIsSelected] = useState(false);
  const [textValue, setTextValue] = useState("Double-click to edit me");
  const [isEditing, setIsEditing] = useState(false); // track editing
  const [stageSize, setStageSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 800,
    height: typeof window !== "undefined" ? window.innerHeight : 600,
  });

  const card = { x: 100, y: 50, width: 600, height: 400 };

  const [cardBgImage, setCardBgImage] = useState<HTMLImageElement | null>(null);

  // Load card background image
  useEffect(() => {
    const img = new window.Image();
    img.src = "https://plus.unsplash.com/premium_photo-1701091957379-923adda557b1?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"; // replace with your image
    img.onload = () => setCardBgImage(img);
  }, []);

  // Stage resize
  useEffect(() => {
    const handleResize = () => {
      setStageSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Transformer selection
  useEffect(() => {
    if (isSelected && transformerRef.current && textRef.current) {
      transformerRef.current.nodes([textRef.current]);
      transformerRef.current.getLayer()?.batchDraw();
    }
  }, [isSelected]);

  const handleDoubleClick = () => {
    const textNode = textRef.current;
    if (!textNode) return;
    const stage = textNode.getStage();
    if (!stage) return;

    setIsEditing(true); // hide canvas text visually but keep mounted

    const textPosition = textNode.getClientRect();
    const stageBox = stage.container().getBoundingClientRect();

    // Create textarea overlay
    const textarea = document.createElement("textarea");
    document.body.appendChild(textarea);

    textarea.value = textNode.text();
    textarea.style.position = "absolute";
    textarea.style.top = `${stageBox.top + textPosition.y}px`;
    textarea.style.left = `${stageBox.left + textPosition.x}px`;
    textarea.style.width = `${textPosition.width + 5}px`;
    textarea.style.height = `${textPosition.height + 5}px`;
    textarea.style.fontSize = `${textNode.fontSize()}px`;
    textarea.style.fontFamily = textNode.fontFamily();
    textarea.style.color = textNode.fill() as string;
    textarea.style.border = "none";
    textarea.style.padding = "0px";
    textarea.style.margin = "0px";
    textarea.style.overflow = "hidden";
    textarea.style.background = "transparent";
    textarea.style.outline = "none";
    textarea.style.resize = "none";
    textarea.style.lineHeight = `${textNode.lineHeight()}`;
    textarea.style.whiteSpace = "pre-wrap";

    textarea.focus();
    textarea.select(); // select all for Ctrl+A

    const removeTextarea = () => {
      setTextValue(textarea.value);
      document.body.removeChild(textarea);
      setIsEditing(false); // show canvas text again
    };

    textarea.addEventListener("blur", removeTextarea);

    textarea.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        textarea.blur();
      }
      if (e.key === "Escape") {
        e.preventDefault();
        textarea.blur();
      }
    });
  };

  return (
    <Stage width={stageSize.width} height={stageSize.height} ref={stageRef}>
      <Layer>
        {/* Card background image */}
        {cardBgImage && (
          <KonvaImage
            image={cardBgImage}
            x={card.x}
            y={card.y}
            width={card.width}
            height={card.height}
            cornerRadius={10}
          />
        )}

        {/* Card border */}
        <Rect
          x={card.x}
          y={card.y}
          width={card.width}
          height={card.height}
          fill="transparent"
          stroke="#ccc"
          strokeWidth={2}
          cornerRadius={10}
        />

        {/* Draggable & Editable Text */}
        <Text
          ref={textRef}
          text={textValue}
          x={card.x + 20}
          y={card.y + 20}
          fontSize={24}
          draggable
          visible={!isEditing} // hide visually but keep mounted
          onClick={() => setIsSelected(true)}
          onDblClick={handleDoubleClick}
          onDragMove={(e) => {
            const node = e.target;
            const newX = Math.max(
              card.x,
              Math.min(node.x(), card.x + card.width - node.width())
            );
            const newY = Math.max(
              card.y,
              Math.min(node.y(), card.y + card.height - node.height())
            );
            node.position({ x: newX, y: newY });
          }}
        />

        {/* Transformer for resizing */}
        {isSelected && <Transformer ref={transformerRef} />}
      </Layer>
    </Stage>
  );
};

export default CanvaLikeTextEditor;
