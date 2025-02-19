import {
  Button, Form, Input, Selector, Slider, Stepper, Switch
} from 'antd-mobile';
import { useState } from 'react';
import HOCProps from '../types/HOCProps';

import { options as distributionOptions } from './options';
import './PollStarter.css';

const PollConfigForm = (hocProps: HOCProps) => {
  const [optionCount, setOptionCount] = useState(0);
  const [ checked, setChecked ] = useState(true);
  const [ budget, setBudget ] = useState(0);

  const onBudgetChange = (value: number | number[]) => {
    let text = ''
    if (typeof value === 'number') {
      text = `${value}`
      setBudget(value);
    }
    console.log(value)
  }

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          {/* Section header */}
          <div className="max-w-3xl mx-auto pb-12 md:pb-16">
            <Form
              layout='horizontal'
              footer={
                <Button block type='submit' color='primary' size='large'>
                  Submit
                </Button>
              }
            >
              <Form.Header>Poll Title</Form.Header>
              <Form.Item
                name='title'
                label='Tite'
                rules={[{ required: true, message: 'Title is required' }]}
              >
                <Input onChange={console.log} placeholder='Poll Title' />
              </Form.Item>
              <Form.Item
                className='custom-width'
                name='options'
                label='How many options will your poll have?'
                childElementPosition='right'
                rules={[
                  {
                    min: 2,
                    type: 'number',
                    message: 'Should have at least two options'
                  },
                ]}
              >
                <Stepper
                  max={10}
                  onChange={value => setOptionCount(value)}
                />
              </Form.Item>
              <Form.Item
                name='isLimited'
                label='Will it limit responses?'
                childElementPosition='right'
              >
                <Switch
                  uncheckedText='No' checkedText='Yes'
                  checked={checked}
                  onChange={val => {
                    setChecked(val)
                  }}
                />
              </Form.Item>
              <Form.Item
                name='responses'
                label='How many responses will it gather?'
                childElementPosition='right'
                disabled={!checked}
                rules={[
                  {
                    min: 1,
                    type: 'number',
                    message: 'Should gather at least one response'
                  },
                ]}
              >
                <Stepper
                  step={10}
                  min={0}
                  max={1000}
                />
              </Form.Item>
              <Form
                layout='vertical'
              >
                <Form.Item
                  name='budget'
                  label='How much budget does it have?'
                >
                  <Slider
                    min={0}
                    max={10}
                    onAfterChange={onBudgetChange}
                    icon='π'
                    popover={(value) => <span>{value} π</span>}
                    step={0.5}
                    // step={10}
                    // ticks
                    // marks={marks}
                  />
                </Form.Item>
              </Form>
              <Form
                layout='vertical'
              >
                <Form.Item
                  name='distribution'
                  label='When will you distribute the incentives?'
                >
                  <Selector
                    columns={2}
                    options={distributionOptions}
                    defaultValue={['1']}
                    onChange={(arr, extend) => console.log(arr, extend.items)}
                  />
                </Form.Item>
              </Form>,
            </Form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PollConfigForm;