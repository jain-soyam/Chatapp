export const useChatRoomStyles = () => ({
  stackOneStyles: { height: "100vh", display: "flex" },

  stackTwoStyles: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    background: "whitesmoke",
    rowGap: "0.25rem",
    padding: "0.5rem 0",
    border: "none",
    borderRadius: "1rem",
  },

  avatarOneStyles: { width: "5rem", height: "5rem" },

  textOneStyles: {
    fontSize: "1.5rem",
    fontWeight: 600,
    textTransform: "capitalize",
    fontFamily: "Poppins, sans-serif",
  },

  stackThreeStyles: {
    display: "flex",
    rowGap: "1rem",
    height: "100%",
    padding: "1rem 0",
    justifyContent: "flex-end",
  },

  paperOneStyles: {
    padding: 2,
    height: "75vh",
    overflowY: "scroll",
    background: "rgba(255, 255, 255, 1)",
    display: "flex",
    flexDirection: "column",
    rowGap: "0.75rem",
    border: "none",
    borderRadius: "1rem",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },

  boxOneStyles: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    // background: "pink",
    columnGap: "1rem",
  },

  textfieldOneStyles: {
    "& .MuiInputBase-root": {
      background: "#F5F7FB",
      fontSize: "16px",
      fontWeight: 400,
      lineHeight: "22.4px",
      textAlign: "left",
      borderRadius: "0.625rem",
      "& fieldset": {
        border: "none",
      },
      "&:hover fieldset": {
        border: "none",
      },
      "&.MuiInputBase-root.Mui-focused fieldset": {
        border: "1px solid #5E53DA",
      },
    },
    "& .MuiFormLabel-root": {
      fontSize: "1rem",
    },
  },

  fabOneStyles: {
    background: "#5E53DA",
    boxShadow: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "&:hover": { background: "#5E53DA" },
    "&:focus": { background: "#5E53DA" },
  },

  iconOneStyles: {
    color: "#FFF",
    transform: "rotate(-45deg)",
    fontSize: "1.5rem",
  },
});
