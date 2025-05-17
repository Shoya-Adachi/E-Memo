import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

const HomeDialog = ({ state, dispatch }) => {
  const queryClient = useQueryClient();

  const [selectedCategoryId, setSelectedCategoryId] = useState("");

  const categories = queryClient.getQueryData(["categories"]);

  const closeDialg = () => {
    dispatch({ type: "RESET" });
  };

  const handleOk = () => {
    dispatch({
      type: "SET_CONTENT",
      payload: { ...state.content, category_id: selectedCategoryId },
    });
    dispatch({
      type: "SET_DIALOG",
    });
  };

  return (
    <Dialog open={state.open}>
      <DialogTitle>カテゴリー選択</DialogTitle>
      <DialogContent dividers>
        <RadioGroup
          value={selectedCategoryId}
          onChange={(e) => setSelectedCategoryId(e.target.value)}
        >
          {categories?.data.map((category) => (
            <FormControlLabel
              key={category.id}
              value={category.id}
              control={
                <Radio
                  sx={{
                    color: "gray", // 非選択時の色
                    "&.Mui-checked": {
                      color: "orange", // ✅ 選択されたときの色
                    },
                  }}
                />
              }
              label={category.title}
            />
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={closeDialg}
          sx={{ color: "primary.contrastText" }}
        >
          キャンセル
        </Button>
        <Button
          onClick={() => handleOk()}
          sx={{ color: "primary.contrastText" }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default HomeDialog;
