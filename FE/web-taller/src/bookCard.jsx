import "./bookCard.css";

const BookCard = ({
  id,
  isActive,
  picture,
  datePublish,
  nameBook,
  gender
}) => {
  return (
    <div className="book-card">
      <h2>{nameBook}</h2>
      <img src={picture} alt={nameBook} className="card-image" />
      <ul>
        <li>
          <strong>Id:</strong> {id}
        </li>
        <li>
          <strong>Nombre:</strong> {nameBook}
        </li>
        <li>
          <strong>Género:</strong> {gender}
        </li>
        <li>
          <strong>Activo:</strong> {isActive ? 'Sí' : 'No'}
        </li>
        <li>
          <strong>Fecha Publicación:</strong> {new Date(datePublish).toLocaleDateString()}
        </li>
      </ul>
    </div>
  );
};

export default BookCard;