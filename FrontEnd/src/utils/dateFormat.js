const formatDate = (dateString) => {
    if (!dateString) return "N/A"
    return new Intl.DateTimeFormat("en-GB", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(dateString));
};

export { formatDate };