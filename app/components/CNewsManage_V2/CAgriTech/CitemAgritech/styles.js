const styles = {
    wrapItem: {
        background: "#FFF",
        height: 100,
        margin: 'auto',
        borderBottom: "1px dotted #909090",
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 15,
    },
    showTitle: {
        height: 35,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        cursor: 'pointer',
    },
    showDate: {
        fontSize: 12,
        fontWeight: 100,
        fontStyle: 'italic',
        marginTop: 8,
    },
    showDesc: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: '-webkit-box',
        WebkitLineClamp: 2,
        WebkitBoxOrient: 'vertical',
        marginTop: 5,
        fontWeight: 100,
        fontSize: 13,
    }
}

export default styles;