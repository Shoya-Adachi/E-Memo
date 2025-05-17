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
import { CreateCategoriesApi, GetCategoriesApi } from "../../api/CategoriesApi";
import { GetMemoByCategoryId } from "../../api/MemosApi";
import { useQuery } from "@tanstack/react-query";

const Sidebar = ({ dispatch }) => {
  const inputRef = useRef(null);
  const [view, setView] = useState(false);

  const { data, refetch } = useQuery({
    queryKey: ["categories"],
    queryFn: GetCategoriesApi,
  });

  const categories = data?.data || [];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      inputRef.current?.blur(); // ← フォーカスを外す
    }
  };

  const handleBlur = async (e) => {
    const newCategory = e.target.value;

    if (newCategory === "") {
      setView(false);
    } else {
      const response = await CreateCategoriesApi(newCategory);
      console.log("登録完了", response);
      setView(false);
      refetch();
    }
  };

  const clickHandler = async (id) => {
    const memos = [];
    dispatch({ type: "RESET" });
    try {
      const response = await GetMemoByCategoryId(id);
      const datas = response.data;

      datas.forEach((data) => {
        memos.push({
          id: data.id,
          title: data.title,
        });
      });

      dispatch({ type: "SET_LISTS", payload: memos });
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
          {categories?.map((Category) => (
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
