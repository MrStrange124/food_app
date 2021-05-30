import { useEffect, useState } from 'react';
import classes from './AvailableMeals.module.css'
import Card from '../UI/Card'
import MealItem from './Mealitem/Mealitem'

const Availablemeals = () => {
	const [meals, setmeals] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [httpError, setHttpError] = useState();

	useEffect(() => {
		const fetchMeals = async () => {
			const response = await fetch('https://praxis-water-294315-default-rtdb.firebaseio.com/meals.json');
			const responseData = await response.json();
			if (!response.ok) {
				throw new Error('something went worng');
			}
			const loadedMeals = [];
			for (const key in responseData) {
				loadedMeals.push({
					id: key,
					name: responseData[key].name,
					description: responseData[key].description,
					price: responseData[key].price,
				})
			}
			setmeals(loadedMeals);
			setIsLoading(false);
		};
		fetchMeals().catch((error) => {
			setIsLoading(false);
			setHttpError(error.message);
		})
	}, [])

	if (isLoading) {
		return <div className={classes.loading}>
			<h3>Loading ...</h3>
		</div>
	}
	if (httpError) {
		return <div className={classes.error}>
			<h3>{httpError}</h3>
		</div>
	}

	const mealsList = meals.map(meal =>
		<MealItem
			key={meal.key}
			id={meal.id}
			name={meal.name}
			description={meal.description}
			price={meal.price}

		/>);
	return (
		<section className={classes.meals}>
			<Card>
				<ul>
					{mealsList}
				</ul>
			</Card>
		</section>
	)
};

export default Availablemeals;