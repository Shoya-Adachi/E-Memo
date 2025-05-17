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
import { useReducer, useState } from "react";
import {
  CreateMemo,
  GetMemoByCategoryId,
  GetMemoById,
  UpdateMemo,
} from "../../api/MemosApi";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import HomeDialog from "./components/dialog";

const Home = () => {
  const initialState = {
    open: false,
    lists: [
      {
        id: null,
        title: "",
      },
    ],
    content: {
      id: null,
      content: "",
      title: "",
      category_id: "",
      new: false,
    },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "SET_CONTENT":
        return { ...state, content: action.payload };
      case "SET_LISTS":
        return { ...state, lists: action.payload };
      case "SET_DIALOG":
        return { ...state, open: !state.open };
      case "RESET":
        return initialState;
      default:
        return state;
    }
  }

  const clickHandler = async (id) => {
    const response = await GetMemoById(id);
    const oldContent = {
      id: response.data.id,
      content: response.data.content,
      title: response.data.title,
      category_id: response.data.category_id,
    };
    dispatch({ type: "SET_CONTENT", payload: oldContent });
  };

  const saveMemo = async () => {
    console.log(state.content);
    if (state.content.new === true) {
      try {
        const response = await CreateMemo(state.content);

        console.log("登録成功", response);

        if (response.status === "success") {
          const memos = [];
          const res = await GetMemoByCategoryId(state.content.category_id);
          const datas = res.data;

          datas.forEach((data) => {
            memos.push({
              id: data.id,
              title: data.title,
            });
          });

          dispatch({ type: "SET_LISTS", payload: memos });
        }
      } catch (error) {
        console.error;
      }
    } else if (state.content.id === null) {
      console.log("メモが選択されてません");
    } else {
      try {
        const response = await UpdateMemo(state.content);

        console.log("更新成功", response);

        if (response.status === "success") {
          const memos = [];
          const res = await GetMemoByCategoryId(state.content.category_id);
          const datas = res.data;

          datas.forEach((data) => {
            memos.push({
              id: data.id,
              title: data.title,
            });
          });

          dispatch({ type: "SET_LISTS", payload: memos });
        }
      } catch (error) {
        console.error;
      }
    }
  };

  const createMemo = () => {
    dispatch({ type: "RESET" });
    dispatch({ type: "SET_DIALOG" });
    dispatch({
      type: "SET_CONTENT",
      payload: {
        ...state.content,
        content: "メモを記入",
        title: "タイトルを入力してください",
        new: true,
      },
    });
  };

  return (
    <Layout>
      <Box sx={{ display: "flex", height: "100%", position: "relative" }}>
        <Sidebar dispatch={dispatch} />
        <List
          sx={{
            width: "200px",
            borderRight: "1px solid ",
            borderColor: (theme) =>
              alpha(theme.palette.primary.contrastText, 0.1),
          }}
        >
          {state.lists.map((item) => (
            <ListItem key={item.id} sx={{ padding: 0 }}>
              <ListItemButton onClick={() => clickHandler(item.id)}>
                <ListItemText sx={{ color: "primary.contrastText" }}>
                  {item.title}
                </ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Box sx={{ width: "100%", padding: 2 }}>
          <TextField
            value={state.content.title}
            sx={{
              width: "100%",
              "& .MuiInputBase-input": {
                fontSize: "2rem", // ✅ テキストが小さすぎないように調整
                fontWeight: "800",
                padding: 0,
                marginBottom: "10px",
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
              dispatch({
                type: "SET_CONTENT",
                payload: { ...state.content, title: e.target.value },
              })
            }
          />
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
                padding: 0,
                "& fieldset": {
                  border: "none", // 通常時の枠線を消す
                },
                "&.Mui-focused fieldset": {
                  border: "none", // フォーカス時も枠線を消す
                },
              },
            }}
            onChange={(e) =>
              dispatch({
                type: "SET_CONTENT",
                payload: { ...state.content, content: e.target.value },
              })
            }
            value={state.content.content}
          />
        </Box>
      </Box>
      <Fab
        sx={{
          position: "fixed",
          bottom: 60,
          right: 180,
          width: "80px",
          height: "80px",
          zIndex: 2000,
          backgroundColor:
            state.content.id !== null || state.content.new
              ? "#ff7f1e"
              : "#e2e2e2",
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
      <Fab
        sx={{
          position: "fixed",
          bottom: 60,
          right: 60,
          width: "80px",
          height: "80px",
          zIndex: 2000,
          backgroundColor: "#0adb00",
        }}
        onClick={createMemo}
      >
        <BorderColorIcon
          sx={{
            width: "40px",
            height: "40px",
            color: "#ffffff",
          }}
        />
      </Fab>
      <HomeDialog state={state} dispatch={dispatch} />
    </Layout>
  );
};

export default Home;
