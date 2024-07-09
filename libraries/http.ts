import { supabase } from "@/constants/Supabase";
import { Drill } from "@/app/_layout";


// function to duplicate each element of an array
function duplicateArrayElements(array: Drill[]) {
    return array.flatMap((item) => [item, item]);
}


// Function to shuffle an array
function shuffleArray(array: Drill[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}


// Fetch all drills from the database
export const fetchAllDrills = async () => {
    try {
        const { data, error } = await supabase.from('drills').select("*");
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching drills: ", error);
    }
}

// Fetch a random selection of 5 drills from the database
export const fetchRandomDrills = async (num: number) => {
    try {
        const { data, error } = await supabase.from('drills').select("*");
        if (error) throw error;
        const shuffledData = shuffleArray(data);
        const arraySlice = shuffledData.slice(0, num);
        return duplicateArrayElements(arraySlice);
    } catch (error) {
        console.error("Error fetching drills: ", error);
    }
}



// Fetch all drills having the specified tag from the database
export const fetchDrillByTag = async (tag: string, num: number) => {
    try {
        const { data, error } = await supabase.from('drills').select("*").contains('tags', [tag]);
        if (error) throw error;
        const shuffledData = shuffleArray(data);
        const arraySlice = shuffledData.slice(0, num);
        return duplicateArrayElements(arraySlice);
    } catch (error) {
        console.error("Error fetching drills: ", error);
    }
}


// // Fetch all drills having the specified tags from the database
// export const fetchDrillsByTags = async (tags: string[], num: number) => {
//     try {
//         const { data, error } = await supabase.from('drills').select().in('tags', ['judo', 'takedown']);
//         if (error) throw error;
//         const shuffledData = shuffleArray(data);
//         const arraySlice = shuffledData.slice(0, num);
//         return duplicateArrayElements(arraySlice);
//     } catch (error) {
//         console.error("Error fetching drills: ", error);
//     }
// }

export const fetchDrillsByTags = async (tags: string[], num: number) => {
    try {
        // Adjust the query to use the ANY operator for array comparison
        const { data, error } = await supabase
            .from('drills')
            .select()
            .or(tags.map(tag => `tags.cs.{${tag}}`).join(','));
        
        if (error) throw error;
        const shuffledData = shuffleArray(data);
        const arraySlice = shuffledData.slice(0, num);
        return duplicateArrayElements(arraySlice);
    } catch (error) {
        console.error("Error fetching drills: ", error);
    }
}













