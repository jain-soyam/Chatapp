export const useMessageContainerStyles = () => ({
  boxOneStyles: (isCurrentUser: boolean) => {
    return {
      display: "flex",
      justifyContent: isCurrentUser ? "flex-end" : "flex-start",
    };
  },

  paperOneStyles: {
    display: "flex",
    columnGap: "1rem",
    padding: "0.5rem 1rem",
    minWidth: "25rem",
    maxWidth: "80%",
    wordBreak: "break-word",
    boxShadow: "none",
    background: "transparent",
  },

  stackOneStyles: {
    display: "flex",
    rowGap: "0.25rem",
  },

  stackTwoStyles: (isCurrentUser: boolean) => {
    return {
      display: "flex",
      rowGap: "0.5rem",
      background: "blue",
      flexGrow: "1",
      backgroundColor: isCurrentUser ? "#5E53DA" : "#F5F7FB",
      borderRadius: isCurrentUser ? "1rem 0 1rem 1rem" : "0 1rem 1rem 1rem",
      padding: "1rem",
    };
  },

  textThreeStyles: {
    color: "",
    fontWeight: 400,
    textTransform: "",
    letterSpacing: "0.025rem",
    fontSize: "0.8rem",
    fontFamily: "Poppins, sans-serif",
  },

  textOneStyles: (isCurrentUser: boolean) => {
    return {
      color: isCurrentUser ? "#FFF" : "#1c1c1c",
      fontWeight: 600,
      textTransform: "capitalize",
      letterSpacing: "0.05rem",
      fontSize: "1rem",
      wordBreak: "break-word",
      fontFamily: "Poppins, sans-serif",
    };
  },

  textTwoStyles: (isCurrentUser: boolean) => {
    return {
      color: isCurrentUser ? "#FFF" : "#1c1c1c",
      fontWeight: 400,
      textTransform: "",
      letterSpacing: "0.025rem",
      fontFamily: "Poppins, sans-serif",
    };
  },
});
