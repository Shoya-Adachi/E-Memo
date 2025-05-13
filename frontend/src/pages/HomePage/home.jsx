import {
  alpha,
  Box,
  Fab,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import Layout from "../../Layout";
import Sidebar from "../../components/sidebar/sidebar";
import { useState } from "react";
import { GetMemoById, UpdateMemo } from "../../api/MemosApi";
import SaveAsIcon from "@mui/icons-material/SaveAs";

const Home = () => {
  const [lists, setLists] = useState([]);
  const [content, setContent] = useState({
    id: null,
    content: "",
  });

  const clickHandler = async (id) => {
    const response = await GetMemoById(id);
    const oldContent = {
      id: response.data.id,
      content: response.data.content,
    };
    setContent(oldContent);
  };

  const saveMemo = async () => {
    try {
      const response = await UpdateMemo(content);

      console.log("更新成功", response);
    } catch (error) {
      console.error;
    }
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", height: "100%", position: "relative" }}>
        <Sidebar setLists={setLists} setContent={setContent} />
        <List
          sx={{
            width: "200px",
            borderRight: "1px solid ",
            borderColor: (theme) =>
              alpha(theme.palette.primary.contrastText, 0.1),
          }}
        >
          {lists.map((item) => (
            <ListItem key={item.id} sx={{ padding: 0 }}>
              <ListItemButton onClick={() => clickHandler(item.id)}>
                <ListItemText sx={{ color: "primary.contrastText" }}>
                  {item.title}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <TextField
          multiline
          sx={{
            width: "100%",
            "& .MuiInputBase-input": {
              fontSize: "1rem", // ✅ テキストが小さすぎないように調整
            },
            "& .MuiOutlinedInput-root": {
              height: "100%",
              alignItems: "flex-start",
              "& fieldset": {
                border: "none", // 通常時の枠線を消す
              },
              "&.Mui-focused fieldset": {
                border: "none", // フォーカス時も枠線を消す
              },
            },
          }}
          onChange={(e) =>
            setContent((prev) => ({
              ...prev, // idなどを保持
              content: e.target.value, // contentだけ更新
            }))
          }
          value={content.content}
        />
      </Box>
      <Fab
        sx={{
          position: "fixed",
          bottom: 60,
          right: 80,
          width: "80px",
          height: "80px",
          zIndex: 2000,
          backgroundColor: "#ff7f1e",
        }}
        onClick={saveMemo}
      >
        <SaveAsIcon
          sx={{
            width: "40px",
            height: "40px",
            color: "#ffffff",
          }}
        />
      </Fab>
    </Layout>
  );
};

export default Home;
