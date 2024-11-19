import './button.css';

const Button = ({ className, icon, text }) => {
    return (
        <div>
            <button type="submit" className={`${className} rounded-3`}>{icon}{text}</button>
        </div>
    )
}

export default Button
