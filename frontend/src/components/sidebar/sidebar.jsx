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
import { useRef, useState } from "react";

const Sidebar = () => {
  const inputRef = useRef(null);
  const [view, setView] = useState(false);
  const [categories, setCategories] = useState([
    { name: "test" },
    { name: "todo" },
  ]);

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
        { name: newCategory }, // 新しいカテゴリを追加
      ]);
      console.log(newCategory); // 新しいカテゴリをログに出力
      setView(false);
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
          {categories.map((Category, index) => (
            <ListItem key={index} disablePadding>
              <ListItemButton sx={{ color: "primary.contrastText" }}>
                <ListItemText>{Category.name}</ListItemText>
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
