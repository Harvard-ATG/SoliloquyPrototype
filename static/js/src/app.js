var Assignment = React.createClass({
    render: function() {
        console.log("assignment render", this.props);
        return React.createElement("li", null, "Assignment: " + this.props.name + " (" + this.props.exercises.length + " exercises)");
    }
})
var AssignmentFactory = React.createFactory(Assignment);

var AssignmentsList = React.createClass({
    render: function() {
        console.log("assignments list render", this.props);
        var assignment_nodes = this.props.assignments.map(function(assignment) {
            return AssignmentFactory(assignment);
        })
        return React.createElement("div", {className:"assignments-list"},
            React.createElement("h3", null, 'Assignments'),
            React.createElement("ul", null, assignment_nodes));
    }
});
var AssignmentsListFactory = React.createFactory(AssignmentsList);

var Application = React.createClass({
    render: function() {
        console.log("application render", this.props);
        return React.createElement("div", null, AssignmentsListFactory({assignments: this.props.assignments}));
    }
});
var ApplicationFactory = React.createFactory(Application);


var APP_DATA = {
    assignments: [{
        name:"Week 1",
        published: true,
        exercises: [{
            name: "Chapter 1 Text Response",
            prompt: {
                type: "text",
                value: "Respond to the text."
            }
        },{
            name: "Chapter 2 Poem Recitation",
            prompt: {
                type: "external_url",
                value: "http://max.mmlc.northwestern.edu/mdenner/Demo/texts/vision.html"
            }
        },{
            name: "Chapter 3 Dialogue Response",
            prompt: {
                type: "audio",
                value: "http://max.mmlc.northwestern.edu/mdenner/Demo/audiofiles/New%20Audio/sat_on_floor.mp3"
            }
        }]
    },{
        name: "Week 2",
        published: true,
        exercises: [{
            name: "Chapter 4 Text Response",
            value: "Response to the text... again."
        }]
    },{
        name: "Week 3",
        published: false,
        exercises: []
    }]
};

React.render(
    ApplicationFactory(APP_DATA),
    document.getElementById('container')
);