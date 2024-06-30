import Layout from '../../components/Layout'

export default function ErrorGeneric() {

    return (
        <div className="text-center mt-5">
            <h1>Something went wrong!</h1>
            <p>Let the developer know something bad has happened so they can fix it.</p>
            <Button onClick={() => navigate(-1)} color="primary">Go Back</Button>
        </div>
    );
}