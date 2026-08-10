import "./popup.css"
const Popup = ({ children }) => {
    return(
    <section className="wrapper">
        <div className="popup">
            {children}
        </div>
    </section>)
}
export default Popup
