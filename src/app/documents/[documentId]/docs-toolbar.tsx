"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

import { type Level } from "@tiptap/extension-heading";
import type { LucideIcon } from "lucide-react";
import { type ColorResult, SketchPicker } from "react-color";
import {
  Search,
  Undo2,
  Redo2,
  Printer,
  Bold,
  Italic,
  Underline,
  Link,
  Indent,
  Outdent,
  MoreHorizontal,
  ChevronDown,
  Star,
  FileText,
  Share,
  User,
  Menu,
  SpellCheckIcon,
  MessageSquarePlusIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
  ChevronDownIcon,
  ImageIcon,
  UploadIcon,
  SearchIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  ListIcon,
  ListOrderedIcon,
  MinusIcon,
  PlusIcon,
  ListCollapseIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { useEditorStore } from "@/store/use-editor-store";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogHeader,
} from "@/components/ui/dialog";

const LineHeightButton = () => {
  const { editor } = useEditorStore();

  const lineheight = [
    {
      label: "Default",
      value: "normal",
    },
    {
      label: "Single",
      value: "1",
    },
    {
      label: "1.15",
      value: "1.15",
    },
    {
      label: "1.5",
      value: "1.5",
    },
    {
      label: "Double",
      value: "2",
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className={
            "h-8 min-w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/60  px-1.5 overflow-hidden text-sm"
          }
        >
          <ListCollapseIcon className="size-4" />
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
        {lineheight.map(({ label, value }) => (
          <Button
            variant={"ghost"}
            key={value}
            onClick={() => editor?.chain().focus().setLineHeight(value).run()}
            className={cn(
              "flex items-center justify-center gap-x-2 px-2 py-1 rounded-sm hover:bg-slate-200/60",
              editor?.getAttributes("paragraph").lineHeight === value &&
                "bg-slate-200/60"
            )}
          >
            <span className="text-sm">{label}</span>
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const IncreaseIndentButton = () => {
  const { editor } = useEditorStore();

  const increaseIndent = () => {
    editor?.chain().focus().sinkListItem("listItem").run();
  };

  const isDisabled = !editor?.can().sinkListItem("listItem");

  return (
    <Button
      variant="ghost"
      onClick={increaseIndent}
      disabled={isDisabled}
      className={
        "h-8 min-w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/60  px-1.5 overflow-hidden"
      }
    >
      <Indent className="w-4 h-4" />
    </Button>
  );
};

const DecreaseIndentButton = () => {
  const { editor } = useEditorStore();

  const decreaseIndent = () => {
    editor?.chain().focus().liftListItem("listItem").run();
  };

  const isDisabled = !editor?.can().liftListItem("listItem");

  return (
    <Button
      variant="ghost"
      onClick={decreaseIndent}
      disabled={isDisabled}
      className={
        "h-8 min-w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/60  px-1.5 overflow-hidden"
      }
    >
      <Outdent className="w-4 h-4" />
    </Button>
  );
};

const FontSizeButton = () => {
  const { editor } = useEditorStore();
  const currentFontSize = editor?.getAttributes("textStyle").fontSize
    ? editor?.getAttributes("textStyle").fontSize.replace("px", "")
    : "16";

  const [fontSize, setFontSize] = useState(currentFontSize);
  const [inputValue, setInputValue] = useState(fontSize);
  const [isEditing, setIsEditing] = useState(false);

  const updateFontSize = (newSize: string) => {
    const size = parseInt(newSize);
    if (!isNaN(size) && size > 0) {
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newSize);
      setInputValue(newSize);
      setIsEditing(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {
    updateFontSize(inputValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  };

  const increment = () => {
    const newSize = parseInt(fontSize) + 1;
    updateFontSize(newSize.toString());
  };

  const decrement = () => {
    const newSize = parseInt(fontSize) - 1;
    if (newSize > 0) {
      updateFontSize(newSize.toString());
    }
  };
  return (
    <div className="flex items-center gap-x-1">
      <Button
        variant={"ghost"}
        onClick={decrement}
        className="h-7 w-7 shrink-0 flex items-center justify-center hover:bg-neutral-200/80 rounded-sm"
      >
        <MinusIcon className="size-4" />
      </Button>
      {isEditing ? (
        <Input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleKeyDown}
          className="h-7 w-12 text-sm text-center  border border-neutral-400 bg-transparent focus:outline-none focus:ring-0 rounded-sm"
        />
      ) : (
        <Button
          variant={"ghost"}
          onClick={() => {
            setIsEditing(true);
            setFontSize(currentFontSize);
          }}
          className="h-7 w-10 text-sm text-center  border border-neutral-400 rounded-sm bg-transparent cursor-text"
        >
          {currentFontSize}
        </Button>
      )}
      <Button
        variant={"ghost"}
        onClick={increment}
        className="h-7 w-7 shrink-0 flex items-center justify-center hover:bg-neutral-200/80 rounded-sm"
      >
        <PlusIcon className="size-4" />
      </Button>
    </div>
  );
};

const AlignButton = () => {
  const { editor } = useEditorStore();

  const alignments = [
    {
      label: "Align Left",
      value: "left",
      icon: AlignLeftIcon,
    },
    {
      label: "Align Center",
      value: "center",
      icon: AlignCenterIcon,
    },
    {
      label: "Align Right",
      value: "right",
      icon: AlignRightIcon,
    },
    {
      label: "Align Justify",
      value: "justify",
      icon: AlignJustifyIcon,
    },
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className={
            "h-8 min-w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/60  px-1.5 overflow-hidden text-sm"
          }
        >
          <AlignLeftIcon className="size-4" />
          <ChevronDown className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1 ">
        {alignments.map(({ label, value, icon: Icon }) => (
          <Button
            variant={"ghost"}
            key={value}
            onClick={() => editor?.chain().focus().setTextAlign(value).run()}
            className={cn(
              "flex items-center justify-center gap-x-2 px-2 py-1 rounded-sm hover:bg-slate-200/60",
              editor?.isActive({ TextAlign: value }) && "bg-neutral-200/80"
            )}
          >
            <Icon className="size-4" />
            <span className="text-sm">{label}</span>
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const ImageButton = () => {
  const { editor } = useEditorStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const onChange = (src: string) => {
    editor?.chain().focus().setImage({ src }).run();
  };

  const onUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";

    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        onChange(imageUrl);
      }
    };

    input.click();
  };

  const handleImageUrlSubmit = () => {
    if (imageUrl) {
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  };
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size={"sm"}
            variant={"ghost"}
            className={
              "h-8 min-w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/60  px-1.5 overflow-hidden"
            }
          >
            <ImageIcon className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="p-2.5 flex flex-col items-center justify-center gap-x-2">
          <DropdownMenuItem onClick={onUpload}>
            <UploadIcon className="size-4 mr-2" />
            Upload image
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsDialogOpen(true)}>
            <SearchIcon className="size-4 mr-2" />
            Paste image url
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Inser image URL</DialogTitle>
          </DialogHeader>
          <Input
            placeholder="Insert image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleImageUrlSubmit();
              }
            }}
          />
          <DialogFooter>
            <Button onClick={handleImageUrlSubmit}>Insert</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

const LinkButton = () => {
  const { editor } = useEditorStore();
  const [value, setValue] = useState(editor?.getAttributes("link").href || "");

  const onChange = (href: string) => {
    editor?.chain().focus().extendMarkRange("link").setLink({ href }).run();
    setValue("");
  };
  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (open) {
          setValue(editor?.getAttributes("link").href || "");
        }
      }}
    >
      <DropdownMenuTrigger asChild>
        <Button
          size={"sm"}
          variant={"ghost"}
          className={
            "h-8 min-w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/60  px-1.5 overflow-hidden"
          }
        >
          <Link className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center justify-center gap-x-2">
        <Input
          placeholder="https://example.com"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <Button variant={"outline"} onClick={() => onChange(value)}>
          Aplly
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HighlightColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("highlight").color || "#FFFF00";

  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({ color: color.hex }).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2">
          <div
            className="w-4 h-4 p-1 rounded-sm flex items-center justify-center"
            style={{ backgroundColor: value }}
          >
            <span className="text-xs font-bold text-gray-800">A</span>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TextColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="p-2 relative">
          <span className="text-gray-600 font-bold p-0.5">A</span>
          <div
            className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-0.5 bg-gray-800"
            style={{ backgroundColor: value }}
          ></div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const HeadingLevelButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    { label: "Normal text", value: 0, fontSize: "16px" },
    { label: "Title", value: 1, fontSize: "32px" },
    { label: "Subtitle", value: 2, fontSize: "24px" },
    { label: "Heading 1", value: 3, fontSize: "22px" },
    { label: "Heading 2", value: 4, fontSize: "20px" },
    { label: "Heading 3", value: 5, fontSize: "18px" },
    { label: "Heading 4", value: 6, fontSize: "16px" },
  ];

  const getCurrentHeading = () => {
    for (let level = 1; level <= 6; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal text";
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className={
            "h-8 min-w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/60  px-1.5 overflow-hidden text-sm"
          }
        >
          <span className="truncate font-semibold">{getCurrentHeading()}</span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <Button
            key={value}
            variant={"ghost"}
            style={{ fontSize }}
            onClick={() => {
              if (value == 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-slate-200/60",
              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-slate-200/60")
            )}
          >
            {label}
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FontFamilyButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    { label: "Arial", value: "Arial" },
    { label: "Georgia", value: "Georgia" },
    { label: "Impact", value: "Impact" },
    { label: "Tahoma", value: "Tahoma" },
    { label: "Times New Roman", value: "Times New Roman" },
    { label: "Trebuchet MS", value: "Trebuchet MS" },
    { label: "Verdana", value: "Verdana" },
    { label: "Courier New", value: "Courier New" },
    { label: "Comic Sans MS", value: "Comic Sans MS" },
    { label: "Roboto", value: "Roboto" },
    { label: "Open Sans", value: "Open Sans" },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"ghost"}
          className={
            "h-8 w-[120px] shrink-0 items-center justify-between rounded-sm hover:bg-neutral-200/60  px-1.5 overflow-hidden text-sm"
          }
        >
          <span className="truncate font-semibold">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="ml-2 size-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <Button
            variant={"ghost"}
            key={value}
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-slate-200/60",
              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-slate-200/60"
            )}
            style={{ fontFamily: value }}
          >
            <span className="text-sm">{label}</span>
          </Button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

interface ToolbarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
  label?: string;
  className?: string;
}

const ToolbarButton = ({
  onClick,
  isActive,
  icon: Icon,
  label,
  className,
}: ToolbarButtonProps) => {
  return (
    <Button
      onClick={onClick}
      variant="ghost"
      size="sm"
      className={cn(
        "text-sm h-7 min-w-7 p-2 items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80",
        className
      )}
      title={label}
    >
      <Icon className="w-4 h-4 text-gray-600" />
    </Button>
  );
};

export default function ResponsiveDocsToolbar() {
  const { editor } = useEditorStore();

  const [zoom, setZoom] = useState("100%");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    "File",
    "Edit",
    "View",
    "Insert",
    "Format",
    "Tools",
    "Extensions",
    "Help",
  ];

  // Desktop toolbar sections
  const desktopSections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    // Search section
    [
      {
        label: "Search",
        icon: Search,
        onClick: () => console.log("Search clicked"),
      },
    ],
    // Undo/Redo/Print section
    [
      {
        label: "Undo",
        icon: Undo2,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: Printer,
        onClick: () => window.print(),
      },
    ],
    // Text formatting section
    [
      {
        label: "Bold",
        icon: Bold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: Italic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: Underline,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
    // List sections
    [
      {
        label: "Bulleted List",
        icon: ListIcon,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList"),
      },
    ],
    [
      {
        label: "Ordered List",
        icon: ListOrderedIcon,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList"),
      },
    ],
  ];

  // Mobile priority sections
  const mobileSections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    // Essential mobile tools
    [
      {
        label: "Search",
        icon: Search,
        onClick: () => console.log("Search clicked"),
      },
    ],
    // Undo/Redo/Print section
    [
      {
        label: "Undo",
        icon: Undo2,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: Printer,
        onClick: () => window.print(),
      },
    ],
    // Text formatting section
    [
      {
        label: "Bold",
        icon: Bold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: Italic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: Underline,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
    // List sections
    [
      {
        label: "Bulleted List",
        icon: ListIcon,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList"),
      },
    ],
    [
      {
        label: "Ordered List",
        icon: ListOrderedIcon,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList"),
      },
    ],
  ];

  // Tablet sections
  const tabletSections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "Search",
        icon: Search,
        onClick: () => console.log("Search clicked"),
      },
    ],
    // Undo/Redo/Print section
    [
      {
        label: "Undo",
        icon: Undo2,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "Redo",
        icon: Redo2,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: Printer,
        onClick: () => window.print(),
      },
    ],
    // Text formatting section
    [
      {
        label: "Bold",
        icon: Bold,
        onClick: () => editor?.chain().focus().toggleBold().run(),
        isActive: editor?.isActive("bold"),
      },
      {
        label: "Italic",
        icon: Italic,
        onClick: () => editor?.chain().focus().toggleItalic().run(),
        isActive: editor?.isActive("italic"),
      },
      {
        label: "Underline",
        icon: Underline,
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
        isActive: editor?.isActive("underline"),
      },
    ],
    [
      {
        label: "Spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellcheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
      {
        label: "List Todo",
        icon: ListTodoIcon,
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
        isActive: editor?.isActive("taskList"),
      },
      {
        label: "Remove Formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
    // List sections
    [
      {
        label: "Bulleted List",
        icon: ListIcon,
        onClick: () => editor?.chain().focus().toggleBulletList().run(),
        isActive: editor?.isActive("bulletList"),
      },
    ],
    [
      {
        label: "Ordered List",
        icon: ListOrderedIcon,
        onClick: () => editor?.chain().focus().toggleOrderedList().run(),
        isActive: editor?.isActive("orderedList"),
      },
    ],
  ];

  return (
    <div className="w-full fixed top-0 left-0 right-0 items-center px-2 z-50 bg-white border-b border-gray-200">
      {/* Top Menu Bar */}
      <div className="flex items-center justify-between px-2 sm:px-4 py-2">
        <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
          <div className="flex items-center space-x-1 sm:space-x-2 min-w-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500 rounded flex items-center justify-center flex-shrink-0">
              <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
            </div>
            <span className="text-gray-700 font-medium text-sm sm:text-base truncate">
              Untitled document
            </span>
            <Button
              variant="ghost"
              size="sm"
              className="p-1 flex-shrink-0 hidden sm:flex"
            >
              <Star className="w-4 h-4 text-gray-500" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-700 text-xs sm:text-sm px-2 sm:px-3"
          >
            <Share className="w-3 h-3 sm:w-4 sm:h-4 mr-1" />
            <span className="hidden sm:inline">Share</span>
            <ChevronDown className="w-3 h-3 ml-1" />
          </Button>
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-orange-400 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
          </div>
        </div>
      </div>

      {/* Desktop Menu Items */}
      <div className="hidden lg:flex items-center px-4 py-1 text-sm">
        {menuItems.map((item) => (
          <Button
            key={item}
            variant="ghost"
            size="sm"
            className="text-gray-700 px-2 py-1 h-auto"
          >
            {item}
          </Button>
        ))}
      </div>

      {/* Mobile Menu Sheet */}
      <div className="lg:hidden border-t border-gray-100">
        <div className="flex items-center px-2 py-1">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="sm" className="p-2">
                <Menu className="w-4 h-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-2 mt-4">
                {menuItems.map((item) => (
                  <Button key={item} variant="ghost" className="justify-start">
                    {item}
                  </Button>
                ))}
              </div>
            </SheetContent>
          </Sheet>
          <div className="flex items-center space-x-1 overflow-x-auto">
            {menuItems.slice(0, 4).map((item) => (
              <Button
                key={item}
                variant="ghost"
                size="sm"
                className="text-gray-700 px-2 py-1 h-auto text-xs whitespace-nowrap"
              >
                {item}
              </Button>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {menuItems.slice(4).map((item) => (
                  <DropdownMenuItem key={item}>{item}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main Toolbar */}
      <div className=" border-gray-100">
        {/* Mobile Priority Toolbar */}
        <div className="flex md:hidden lg:hidden items-center px-2 py-2 space-x-1 overflow-x-auto">
          {mobileSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center space-x-1">
              {section.map((item) => (
                <ToolbarButton
                  key={item.label}
                  {...item}
                  className="flex-shrink-0"
                />
              ))}
              {sectionIndex < mobileSections.length - 1 && (
                <Separator orientation="vertical" className="h-6 mx-1" />
              )}
            </div>
          ))}

          <Separator orientation="vertical" className="h-6 mx-1" />
        </div>

        {/* Desktop Full Toolbar */}
        <div className="hidden bg-slate-100 lg:flex items-center px-4 py-2 space-x-1 rounded-full">
          {desktopSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center space-x-1">
              {section.map((item) => (
                <ToolbarButton key={item.label} {...item} />
              ))}
              {sectionIndex < desktopSections.length - 1 && (
                <Separator orientation="vertical" className="h-6 mx-1" />
              )}
            </div>
          ))}

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Indent section */}
          <DecreaseIndentButton />
          <IncreaseIndentButton />

          <Separator orientation="vertical" className="h-6 mx-1" />

          <Button
            size={"sm"}
            variant={"ghost"}
            className={
              "h-8 min-w-7 shrink-0 items-center justify-center rounded-sm hover:bg-neutral-200/60  px-1.5 overflow-hidden"
            }
          >
            <MessageSquarePlusIcon />
          </Button>

          <LinkButton />
          <ImageButton />

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Zoom */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className="px-2 py-1 text-gray-700"
              >
                {zoom}
                <ChevronDown className="w-3 h-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setZoom("50%")}>
                50%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom("75%")}>
                75%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom("100%")}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom("125%")}>
                125%
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setZoom("150%")}>
                150%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Text Style */}
          <HeadingLevelButton />

          {/* Font */}
          <FontFamilyButton />

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Font Size */}
          <FontSizeButton />
          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Text Color */}
          <TextColorButton />

          {/* Highlight */}
          <HighlightColorButton />

          <Separator orientation="vertical" className="h-6 mx-1" />

          {/* Alignment */}
          <AlignButton />

          {/* Line Spacing */}
          <LineHeightButton />
        </div>

        {/* Tablet Toolbar */}
        <div className="hidden md:flex lg:hidden items-center px-3 py-2 space-x-1 overflow-x-auto">
          {tabletSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="flex items-center space-x-1">
              {section.map((item) => (
                <ToolbarButton
                  key={item.label}
                  {...item}
                  className="flex-shrink-0"
                />
              ))}
              {sectionIndex < tabletSections.length - 1 && (
                <Separator orientation="vertical" className="h-6 mx-1" />
              )}
            </div>
          ))}

          <Separator orientation="vertical" className="h-6 mx-1" />

          <HeadingLevelButton />
          <FontFamilyButton />
          <AlignButton />
        </div>
      </div>
    </div>
  );
}
