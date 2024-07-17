import { supabase } from "@/constants/Supabase";
import { Drill } from "@/app/_layout";


/* ***Database tag_ids***
 1: basic
 2: advanced
 3: judo
 4: takedown
*/

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



// fetch all drills having the tag 'advanced' from the database
export const fetchDrillsByTagIDs = async (tagIDs: number[], num: number ) => {
    try {
        const { data, error } = await supabase
            .from('drill_tags')
            .select(`drills (id, name, video_url)`
            )
            .in('tag_id', tagIDs); // Assuming 'tag_id' refers to the tag's ID
        // Assuming there is data, map over it and return the drills
        if (data) {
            const drills = data.flatMap(item => item.drills)
            const shuffledData = shuffleArray(drills);
            const arraySlice = shuffledData.slice(0, num);
            console.log(arraySlice)
            return duplicateArrayElements(arraySlice);
        } else {
            return []
        }
    }
    catch (error) {
        console.error('Error fetching drills:', error);
        return [];
    }

}















