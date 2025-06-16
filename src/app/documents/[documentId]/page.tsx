import Editor from "./editor";
import Toolbar from "./docs-toolbar";

interface DocumentsIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentsIdPage = async ({ params }: DocumentsIdPageProps) => {
  const { documentId } = await params;
  console.log("DocId: ", documentId);
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Toolbar/>
      <Editor />
    </div>
  );
};

export default DocumentsIdPage;
