import "./bookCard.css";

const CardScientist = ({
  id,
  isActive,
  picture,
  datePublish,
  nameBook,
  gender
}) => {
  return (
    <div className="book-card"> <h2>{}</h2>
      <img src={picture} className="card-image" />
      <ul>
        <li>
          <strong>Id:</strong> {id}
        </li>
        <li>
          <strong>NameBook:</strong> {nameBook}
        </li>
        <li>
          <strong>Gender:</strong> {gender}
        </li>
        <li>
          <strong>IsActive:</strong> {isActive}
        </li>
        <li>
          <strong>datePublish:</strong> {datePublish}
        </li>
      </ul>
    </div>
  );
};

export default bookCard;