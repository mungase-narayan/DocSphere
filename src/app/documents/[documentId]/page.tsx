import Editor from "./editor";

interface DocumentsIdPageProps {
  params: Promise<{ documentId: string }>;
}

const DocumentsIdPage = async ({ params }: DocumentsIdPageProps) => {
  const { documentId } = await params;
  console.log("DocId: ", documentId);
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <Editor />
    </div>
  );
};

export default DocumentsIdPage;
