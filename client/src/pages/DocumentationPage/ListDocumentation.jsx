import { useEffect, useState } from "react";
import { Paper, Stack } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import { ExpandMore, ChevronRight } from "@mui/icons-material";

import {
  useGetDocumentationQuery,
  useGetDocumentationByIdQuery,
} from "../../features/api/apiSlice";
import StyledTreeItem from "./Fragments/StyledTreeItem";
import PageTitle from "../../components/PageTitle";
import AddDocumentation from "./Fragments/AddDocumentation";
import EditDocumentation from "./Fragments/EditDocumentation";
import Loading from "../../components/Loading";

const recursive = (data) => {
  return data.map((item) => {
    if (item?.children?.length > 0) {
      return {
        ...item,
        children: recursive(item?.children),
      };
    } else {
      return {
        ...item,
        children: [],
      };
    }
  });
};

export default function ListDocumentation() {
  const [data, setData] = useState({});
  const [addDoc, setAddDoc] = useState({ isOpen: false, isFolder: false });
  const [editDoc, setEditDoc] = useState({ isOpen: false, isFolder: false });
  const [selectedFolder, setSelectedFolder] = useState({});

  const { data: documentationData, isLoading: isDocumentationDataLoading } =
    useGetDocumentationQuery();

  useEffect(() => {
    if (documentationData) {
      setData(documentationData[documentationData.length - 1]);
    }
  }, [documentationData]);

  const renderTree = (nodes) => (
    <StyledTreeItem
      key={nodes?.id}
      nodeId={nodes?.id}
      node={nodes}
      addDoc={addDoc}
      setAddDoc={setAddDoc}
      editDoc={editDoc}
      setEditDoc={setEditDoc}
      selectedFolder={selectedFolder}
      setSelectedFolder={setSelectedFolder}
      color="#3c8039"
      bgColor="#e6f4ea"
    >
      {Array.isArray(nodes?.children)
  ? nodes.children
      .filter(node => !node.isDeleted) // Filter out deleted nodes
      .map(node => renderTree(node))
  : null}

    </StyledTreeItem>
  );

  if (isDocumentationDataLoading) {
    return <Loading />;
  }

  return (
    <Stack spacing={3} mt={1.5}>
      <PageTitle title="Documentations" />

      <Paper sx={{ p: 2, display: "flex", alignItems: "center", mb: 3 }}>
        <TreeView
          aria-label="gmail"
          defaultExpanded={[1]}
          defaultCollapseIcon={<ExpandMore />}
          defaultExpandIcon={<ChevronRight />}
          defaultEndIcon={<div style={{ width: 24 }} />}
          sx={{
            flexGrow: 1,
            minHeight: "100%",
            minWidth: "100%",
            overflowY: "auto",
          }}
        >
          {renderTree(data)}
        </TreeView>

        <AddDocumentation
          addDoc={addDoc}
          setAddDoc={setAddDoc}
          selectedFolder={selectedFolder}
        />

        <EditDocumentation
          editDoc={editDoc}
          setEditDoc={setEditDoc}
          selectedFolder={selectedFolder}
        />
      </Paper>
    </Stack>
  );
}
