/**
 * Created by charlie on 2/11/16.
 */
if (Teams.find().count() === 0) {
    Teams.insert({
        number: 1,
        name: 'tigers'
    });
    Teams.insert({
        number: 2,
        name: 'bears'
    });
    Teams.insert({
        number: 3,
        name: 'zephyrs'
    });
}