function FilterButtons({ filterFunc, typeFilter }) {
	return (
		<div className="van-list-filter-buttons">
			<button
				className={`van-type simple ${
					typeFilter === "simple" ? "selected" : ""
				}`}
				onClick={() => filterFunc("type", "simple")}
			>
				Simple
			</button>
			<button
				className={`van-type luxury ${
					typeFilter === "luxury" ? "selected" : ""
				}`}
				onClick={() => filterFunc("type", "luxury")}
			>
				Luxury
			</button>
			<button
				className={`van-type rugged ${
					typeFilter === "rugged" ? "selected" : ""
				}`}
				onClick={() => filterFunc("type", "rugged")}
			>
				Rugged
			</button>

			{typeFilter ? (
				<button
					className="van-type clear-filters"
					onClick={() => filterFunc("type", null)}
				>
					Clear filter
				</button>
			) : null}
		</div>
	);
}

export default FilterButtons;
