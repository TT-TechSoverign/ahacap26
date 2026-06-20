import reviewsDb from './content/reviews_db.json';

export function getSelectedReviews(productId: number): any[] {
    const idHash = Array.from(productId.toString()).reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const allAhacReviews = reviewsDb.affordable_home_ac || [];
    const selectedReviews = [];
    if (allAhacReviews.length > 0) {
        for (let i = 0; i < Math.min(5, allAhacReviews.length); i++) {
            const reviewIdx = (idHash + i) % allAhacReviews.length;
            selectedReviews.push(allAhacReviews[reviewIdx]);
        }
    } else {
        // Fallback reviews if database is empty
        selectedReviews.push(
            { author: "Joyce T.", rating: 5, text: "Brian came over for a free estimate and guided us to the better recommendation for our situation. I appreciate his professional opinion and honest advice. Mahalo!" },
            { author: "Mermaid S.", rating: 5, text: "They were very professional and had a new AC installed in less than an hour. Very energy efficient unit." },
            { author: "Tommylynn B.", rating: 5, text: "I replaced two window ac units, called on Wednesday and Brian came out the next day. Professional, timely and installation was flawless! Mahalo Brian!" },
            { author: "Tim B.", rating: 5, text: "I am giving Affordable Home Air Conditioning in Waipahu my highest recommendation to other Yelp users in the Honolulu area. Brian Borges and his team were quick, thorough and cost effective." }
        );
    }
    return selectedReviews;
}
