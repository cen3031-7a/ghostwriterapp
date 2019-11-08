import React from 'react';
import Adapter from 'enzyme-adapter-react-16'
import {mount, configure} from 'enzyme';
import QuestionPage from './QuestionPage';

configure({adapter: new Adapter()});

test('Questions are properly loaded from database', () => {
	
var data	= 
[
{
	id: 0,
	title: 'TEST Title',
	questions:
	[
		{
			id: 0,
			question: 'What is your favorite color?'
		  }, {
			id: 1,
			question: 'How are you?'
		  }, {
			id: 2,
			question: 'TEST 12345'
		  }, {
			id: 3,
			question: 'IT WORKS!'
		}
	]
}
]
	
	const questionPage = mount(<QuestionPage data={data} />);
	//console.log(questionPage.find('Question').props()debug());
	
	questionPage.find('Question').forEach((q) => { 
	
		expect(q.prop('question')).toBe(data[0].questions[q.prop('id')].question); 
		
	});

});

test('Questions dynamically update as dataset changes', () => {
	
var data	= 
[
{
	id: 0,
	title: 'TEST Title',
	questions:
	[
		{
			id: 0,
			question: 'What is your favorite color?'
		  }, {
			id: 1,
			question: 'How are you?'
		  }, {
			id: 2,
			question: 'TEST 12345'
		  }, {
			id: 3,
			question: 'IT WORKS!'
		}
	]
}
]

var data2 = 
[
{
	id: 0,
	title: 'TEST Title 2',
	questions:
	[
		{
			id: 0,
			question: 'What is your favorite color 2?'
		  }, {
			id: 1,
			question: 'How are you 2?'
		  }, {
			id: 2,
			question: 'TEST 12345 2'
		  }, {
			id: 3,
			question: 'IT WORKS! 2!'
		},
		{
			id: 4,
			question: 'IT WORKS! EVEN MORE!'
		}
	]
}
]
	
	const questionPage = mount(<QuestionPage data={data} />);
	
	questionPage.find('Question').forEach((q) => { 
	
		expect(q.prop('question')).toBe(data[0].questions[q.prop('id')].question); 
		
	});
	//expect(questionPage.);
	questionPage.setProps({data: data2});
	questionPage.update();
	questionPage.find('Question').forEach((q) => { 
	
		expect(q.prop('question')).toBe(data2[0].questions[q.prop('id')].question); 
		
	});

});

test('Text is properly sent through callback functions back to parent', () => {
	
	const data	 = 
[
{
	id: 0,
	title: 'TEST Title',
	questions:
	[
		{
			id: 0,
			question: 'What is your favorite color?'
		  }, {
			id: 1,
			question: 'How are you?'
		  }, {
			id: 2,
			question: 'TEST 12345'
		  }, {
			id: 3,
			question: 'IT WORKS!'
		}
	]
	
}
]
	
	const questionPage = mount(<QuestionPage data={data} />);
	questionPage.find('TextBox').at(1).setState({text: 'This is a test!'});
	questionPage.update();
	expect(questionPage.state('text').text).toBe('This is a test!');

});





