import './style.css'

export const Input = ({ searchValue, handleChange }) => {
    return (
        <input
            className="input"
            onChange={handleChange}
            value={searchValue}
            type="search"
            placeholder="Type your search"
        />
    )
}