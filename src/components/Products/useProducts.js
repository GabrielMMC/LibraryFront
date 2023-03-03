import { useState } from "react";
import { useQuery } from "react-query";
import { get } from "utils/requests";
import { ADMIN_URL } from "utils/variables";

const useProducts = () => {

    const [search, setSearch] = useState("");
    const [page, setPage] = useState(1);

    const { data, isLoading, refetch } = useQuery(["products", search, page], async () => await get(`${ADMIN_URL}/products`));
    const {
        products = []
    } = data || {};

    return {
        products,
        isLoading,
        refetch
    };
}

export default useProducts;