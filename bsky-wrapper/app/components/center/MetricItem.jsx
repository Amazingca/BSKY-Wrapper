const MetricItem = ({Icon, onClick, fillColor, backgroundColor, metricData, minimum}) => {

    return (
        <div className={"MetricItem"} onClick={onClick}>
            <div style={{backgroundColor: `var(${backgroundColor})`, backgroundImage: `linear-gradient(to bottom, var(${backgroundColor + "-darker"}), var(${backgroundColor + "-darker"}))`}} className={"MetricIcon"}>
                <Icon size={"small"} fill={`var(${fillColor})`} />
                {(metricData > minimum) && <p>{metricData}</p>}
            </div>
        </div>
    )
}

MetricItem.defaultProps = {
    fillColor: "--metric-primary",
    backgroundColor: "--metric-accent",
    metricData: 0,
    minimum: 0
}

export default MetricItem;