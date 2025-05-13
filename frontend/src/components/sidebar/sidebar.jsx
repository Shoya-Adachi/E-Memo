import {
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useRef, useState } from "react";
import { GetCategoriesApi } from "../../api/CategoriesApi";
import { GetMemoByCategoryId } from "../../api/MemosApi";

const Sidebar = ({ setLists, setContent }) => {
  const inputRef = useRef(null);
  const [view, setView] = useState(false);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await GetCategoriesApi();
        const newCategories = response.data;

        setCategories(newCategories);
      } catch (error) {
        console.error;
      }
    };
    fetchCategories();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef.current?.blur(); // ← フォーカスを外す
    }
  };

  const handleBlur = (e) => {
    const newCategory = e.target.value;

    if (newCategory === "") {
      setView(false);
    } else {
      setCategories((prevCategories) => [
        ...prevCategories, // 既存のカテゴリをそのまま保持
        { title: newCategory }, // 新しいカテゴリを追加
      ]);
      console.log(newCategory); // 新しいカテゴリをログに出力
      setView(false);
    }
  };

  const clickHandler = async (id) => {
    const memos = [];
    setContent({ id: null, content: "" });
    try {
      const response = await GetMemoByCategoryId(id);
      const datas = response.data;

      datas.forEach((data) => {
        memos.push({
          id: data.id,
          title: data.title,
        });
      });

      setLists(memos);
    } catch (error) {
      console.error;
    }
  };

  return (
    <Box
      sx={{
        width: "200px",
        height: "100vh",
        paddingY: "30px",
        bgcolor: "secondary.main",
      }}
    >
      <Box
        sx={{
          height: "50%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          variant="text"
          startIcon={<AddIcon />}
          sx={{ color: "primary.contrastText", textTransform: "none" }}
          onClick={() => {
            setView(true);
          }}
        >
          New Category
        </Button>
        <Divider />
        <List>
          {categories.map((Category) => (
            <ListItem key={Category.id} disablePadding>
              <ListItemButton
                sx={{ color: "primary.contrastText" }}
                onClick={() => clickHandler(Category.id)}
              >
                <ListItemText>{Category.title}</ListItemText>
              </ListItemButton>
            </ListItem>
          ))}
          {view && (
            <ListItem>
              <TextField
                inputRef={inputRef}
                variant="outlined"
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "primary.contrastText", // 常時この色
                    },
                    "&:hover fieldset": {
                      borderColor: "primary.contrastText", // ホバー時もこの色
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "primary.contrastText", // フォーカス時もこの色（変化しない）
                    },
                  },
                }}
              />
            </ListItem>
          )}
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
