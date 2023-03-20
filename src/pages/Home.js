import { useParams } from "react-router-dom";

const Home = () => {

    const {id} = useParams();

    return (
        <div>
            <h1>Home</h1>
            <p>이 곳은 홈입니다.</p>
        </div>
    );
};

export default Home;