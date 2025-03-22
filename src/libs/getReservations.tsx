export default async function getReservations(){

    // await new Promise( (resolve) => setTimeout(resolve, 5000) )

    const response = await fetch(`${process.env.BACKEND_URL}/api/v1/reservations`, { next : { tags : ['reservations'] } });
    if(!response.ok){
        throw new Error('Failed to fetch reservations')
    }

    return await response.json();
}