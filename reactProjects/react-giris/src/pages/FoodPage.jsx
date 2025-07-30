import FoodList from '../components/Food/FoodList';

function FoodPage() {
  const foodData = [
    { id: 1, name: 'Kebap', price: 80 },
    { id: 2, name: 'Lahmacun', price: 35 },
    { id: 3, name: 'Mantı', price: 50 },
  ];

  return (
    <div>
      <h2 style={{ textAlign: 'center' }}>Yemek Listesi</h2>
      <FoodList foods={foodData} />
    </div>
  );
}

export default FoodPage;
