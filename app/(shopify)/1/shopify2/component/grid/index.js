import clsx from "clsx"

function Grid(props) {
    return (
        <ul {...props} className={clsx('grid grid-flow-row  gap-4 py-5', props.className)}>
            {props.children}
        </ul>
    )
}

function GridItem(props) {
    return (
        <li 
        {...props}
        className={clsx(
            'relative aspect-square h-full w-full overflow-hidden transition-opacity',props.className
        )}
        >
            {props.children}
        </li>
    )
}

Grid.Item=GridItem
export default Grid