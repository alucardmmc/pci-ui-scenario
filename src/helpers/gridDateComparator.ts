const gridDateComparator = (filterLocalDateAtMidnight: any, cellValue: any) => {
    if (cellValue == null) {
        return 0;
    }

    const cellDate = new Date(cellValue);

    if (cellDate < filterLocalDateAtMidnight) {
        return -1;
    } else if (cellDate > filterLocalDateAtMidnight) {
        return 1;
    }

    return 0;
};

export default gridDateComparator;
