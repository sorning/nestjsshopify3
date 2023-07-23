import FilterItemDropdown from "./dropdown";
import { FilterItem } from "./item";

function FilterItemList({ list }) {
    return (
        <>
            <div className="hidden md:block">
                {list.map((item, i) => (
                    <FilterItem key={i} item={item} />
                ))}
            </div>
        </>
    )
}

export default function FilterList({ list, title }) {
    return (
        <>
            <nav className="col-span-2 w-full flex-none px-6 py-2 md:py-4 md:pl-10">
                {title ? (
                    <h3 className="hidden font-semibold text-black dark:text-white md:block">{title}</h3>
                ) : null}
                <ul className="hidden md:block">
                    <FilterItemList list={list} />
                </ul>
                <ul className="md:hidden">
                    <FilterItemDropdown list={list} />
                </ul>
            </nav>
        </>
    )
}