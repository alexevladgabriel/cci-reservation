import { trpc } from '@/utils/trpc';
import { useRouter } from 'next/router';

export default function Rezervare() {
    const router = useRouter();
    const { id } = router.query;
    if (!id) return <>No ID</>;
    const loc = trpc.useQuery(['location.get-one', { id }]);
    return (
        <div className="p-6">
            Location: <span className="font-semibold">{id}</span>
            <p className="font-bold">Products:</p>
            <ol className="list-decimal list-inside">
                <li>Curatare cu abur</li>
                <li>Curatare cu monodisc</li>
                <li>Curatare cu injectie/extractie</li>
                <li>Curatare ecologica</li>
            </ol>
        </div>
    );
}
