import { useSession } from "next-auth/react";
import { trpc } from "../utils/trpc";

export default function Reserve() {
    const locations = trpc.useQuery(["location.get-all"]);
    const createLocationMutation = trpc.useMutation(['location.create-location']);

    const {data: session} = useSession();
    console.log("SESSION: ", session);
    
    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // get data from form and send to server
        const formData = new FormData(e.currentTarget);
        const data = {
            name: formData.get("name") as string,
            description: formData.get("description") as string,
            street: formData.get("street") as string,
            city: formData.get("city") as string,
            postal_code: formData.get("postal_code") as string|undefined|null,
        };
        createLocationMutation.mutate({
          name: data.name,
          description: data.description,
          street: data.street,
          city: data.city,
          postal_code: data.postal_code,
        })

        e.currentTarget.reset();
    };
    return (
        <div className="flex flex-row p-6">
            <div className="">
                <h1 className="text-2xl font-bold">Locations:</h1>
                <ol className="mt-2">
                    {locations.data?.length ? (
                        locations.data.map((location) => (
                            <li key={location.id}>
                                {location.name} - {location.street}
                            </li>
                        ))
                    ) : (
                        <p>No locations had been added</p>
                    )}
                </ol>
            </div>
            <div className="ml-8">
                <form
                    className="flex flex-col"
                    onSubmit={(e) => handleClick(e)}
                >
                    <input
                        name="name"
                        className="rounded border border-gray-300 p-2 focus:outline-sky-500"
                        type={"text"}
                        placeholder="Name"
                        required
                    />
                    <input
                        name="description"
                        className="mt-2 rounded border border-gray-300 p-2 focus:outline-sky-500"
                        type={"text"}
                        placeholder="Description"
                        required
                    />
                    <input
                        name="street"
                        className="mt-2 rounded border border-gray-300 p-2 focus:outline-sky-500"
                        type={"text"}
                        placeholder="Street"
                        required
                    />
                    <input
                        name="city"
                        className="mt-2 rounded border border-gray-300 p-2 focus:outline-sky-500"
                        type={"text"}
                        placeholder="City"
                        required
                    />
                    <input
                        name="postal_code"
                        className="mt-2 rounded border border-gray-300 p-2 focus:outline-sky-500"
                        type={"text"}
                        placeholder="Postal Code"
                    />
                    <button
                        type={"submit"}
                        className="mt-4 rounded py-4 font-semibold text-white bg-sky-400 hover:bg-sky-500 active:bg-sky-600"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}
