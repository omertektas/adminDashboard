function FoodList({ foods }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            {food.name} - {food.price}₺
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodList;
