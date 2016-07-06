angular.module('app').service('DataService', ['$http', function ($http) {

    this.passages = [
        {
            title: 'Gettysburg Address',
            content: 'Fourscore and seven years ago our fathers brought forth, upon this continent, a new nation, conceived in liberty and dedicated to the proposition that all men are created equal. Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived and so dedicated, can long endure. We are met on a great battlefield of that war. We have come to dedicate a portion of it, as a final resting place for those who died here, that the nation might live. This we may, in all propriety do. But in a larger sense, we cannot dedicate, we cannot consecrate, we cannot hallow, this ground. The brave men, living and dead, who struggled here, have hallowed it, far above our poor power to add or detract. The world will little note, nor long remember what we say here; while it can never forget what they did here. It is rather for us the living, we here be dedicated to the great task remaining before us—that from these honored dead we take increased devotion to that cause for which they here gave the last full measure of devotion—that we here highly resolve that these dead shall not have died in vain, that this nation shall have a new birth of freedom, and that government of the people, by the people, for the people shall not perish from the earth.'
        },

        {
            title: 'Winston Churchill Speech, Blood Toil Tears and Sweat',
            content: 'On Friday evening last I received from His Majesty the mission to form a new administration. It was the evident will of Parliament and the nation that this should be conceived on the broadest possible basis and that it should include all parties.I have already completed the most important part of this task.A war cabinet has been formed of five members, representing, with the Labour, Opposition, and Liberals, the unity of the nation. It was necessary that this should be done in one single day on account of the extreme urgency and rigor of events. Other key positions were filled yesterday. I am submitting a further list to the king tonight. I hope to complete the appointment of principal ministers during tomorrow.The appointment of other ministers usually takes a little longer.'
        },
        {
            title: 'Franklin D. Roosevelt\'s Pearl Harbor Address',
            content: 'December 7th, 1941, a date which will live in infamy... No matter how long it may take us to overcome this premeditated invasion, the American people in their righteous might, will win through to absolute victory... I ask that the Congress declare that since the unprovoked and dastardly attack by Japan on Sunday, December 7th, 1941, a state of war has existed between the United States and the Japanese empire.'
        }
    ];

}]);