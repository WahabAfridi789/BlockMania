import { useContract, useContractRead } from "@thirdweb-dev/react";
import { useState, useEffect } from "react";

function useListingData(_listingId) {
    const { contract } = useContract(
        "0xe5c43B8fCaDEbee384fF1Ad7A3A1F30f59991AFB"
    );
    const { data, isLoading } = useContractRead(contract, "getListing", [
        _listingId,
    ]);

    const [listingData, setListingData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!isLoading && data) {
            setListingData(data);
            setLoading(false);
        }
    }, [data, isLoading]);

    return { listingData, loading };
}

export default useListingData;
