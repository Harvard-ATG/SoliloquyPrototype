define(['react'], function(React) { 

var ExerciseItem = React.createClass({
    render: function() {
        return React.createElement("ul", null,
            React.createElement("li", null,
                React.createElement("a", {href:"#"}, this.props.name)));
    }
});
ExerciseItemFactory = React.createFactory(ExerciseItem);

var AssignmentListItem = React.createClass({
    handleClick: function(e) {
        this.props.onClick(this, e);
    },
    render: function() {
        var className = this.props.selected ? "active" : "";
        var exercise_nodes = [];
        if (this.props.selected) {
            exercise_nodes = this.props.assignment.exercises.map(function(exercise, i) {
                return ExerciseItemFactory(exercise);
            });            
        }
        return React.createElement("li",
            {className: className, onClick:this.handleClick},
            this.props.assignment.name,
            exercise_nodes);
    }
})
var AssignmentListItemFactory = React.createFactory(AssignmentListItem);



var AssignmentsList = React.createClass({
    getInitialState: function() {
        return {selected: null};
    },
    onClickItem: function(index) {
        if (this.state.selected === index) {
            this.setState({selected:null});
        } else {
            this.setState({selected: index});
        }
        console.log("onclick list item", index);
    },
    render: function() {
        console.log("assignments list render", this.props);
        var assignment_nodes = this.props.assignments.map(function(assignment, i) {
            return AssignmentListItemFactory({
                assignment: assignment,
                selected: i == this.state.selected,
                onClick: this.onClickItem.bind(this, i)
            });
        }, this)
        return React.createElement("div", {className:"assignments-list-component"}, 
            React.createElement("h3", null, 'Assignments'),
            React.createElement("ul", {className:"assignments-list"}, assignment_nodes));
    }
});
var AssignmentsListFactory = React.createFactory(AssignmentsList);



var Application = React.createClass({
    render: function() {
        console.log("application render", this.props);
        return React.createElement("div", null,
            AssignmentsListFactory({assignments: this.props.assignments}));
    }
});
var ApplicationFactory = React.createFactory(Application);


var APP_DATA = {
    assignments: [{
        id: 1,
        name:"Week 1",
        published: true,
        exercises: [{
            id: 1,
            name: "Chapter 1 Text Response",
            prompt: {
                type: "text",
                value: "Respond to the text."
            }
        },{
            id: 2,
            name: "Chapter 2 Poem Recitation",
            prompt: {
                type: "external_url",
                value: "http://max.mmlc.northwestern.edu/mdenner/Demo/texts/vision.html"
            }
        },{
            id: 3,
            name: "Chapter 3 Dialogue Response",
            prompt: {
                type: "audio",
                value: "http://max.mmlc.northwestern.edu/mdenner/Demo/audiofiles/New%20Audio/sat_on_floor.mp3"
            }
        }]
    },{
        id: 2,
        name: "Week 2",
        published: true,
        exercises: [{
            name: "Chapter 4 Text Response",
            value: "Response to the text... again."
        }]
    },{
        id: 3,
        name: "Week 3",
        published: false,
        exercises: []
    }]
};

React.render(
    ApplicationFactory(APP_DATA),
    document.getElementById('container')
);

});
