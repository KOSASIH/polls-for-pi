
import { DeploymentUnitOutlined, DollarOutlined } from '@ant-design/icons';
import { theme } from 'antd';
import { Button as MobileButton, Form as MobileForm, Selector, Slider, Stepper, Steps as MobileSteps } from 'antd-mobile';
import { SetOutline } from 'antd-mobile-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HOCProps from '../types/HOCProps';
import { Poll } from '../types/Poll';
import { options as distributionOptions } from './options';



const { Step } = MobileSteps;

import './PollWizardSteps.css';

// const marks = {
//   0: '0 π',
//   20: '20 π',
//   40: '40 π',
//   60: '60 π',
//   80: '80 π',
//   100: '100 π',
// }
const marks: any = { };
let x = 0;
while (x <= 100) {
  marks[x] = `${x} π`;
  x = x + 10;
}


const PollWizardSteps = (hocProps: HOCProps) => {
  const navigate = useNavigate();
  const { token } = theme.useToken();
  const [ current, setCurrent ] = useState(0);
  const [ poll, setPoll ] = useState<Poll | null>(null);
  const [ checked, setChecked ] = useState(true);
  const [ budget, setBudget ] = useState(0);

  const [optionCount, setOptionCount] = useState(0);
  console.log('option count', optionCount)

  const onBudgetChange = (value: number | number[]) => {
    let text = ''
    if (typeof value === 'number') {
      text = `${value}`
      setBudget(value);
    }
    console.log(value)
  }

  const steps = [
    {
      key: 1,
      title: 'Options',
      content:
        <MobileForm
          layout='horizontal'
        >
          <MobileForm.Item
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
              defaultValue={2}
              min={2}
              max={10}
              onChange={value => setOptionCount(value)}
            />
          </MobileForm.Item>
      </MobileForm>,
      icon: <SetOutline />,
    },
    {
      key: 4,
      title: 'Budget',
      content:
        <MobileForm
          layout='vertical'
        >
          <MobileForm.Item
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
          </MobileForm.Item>
        </MobileForm>,
      icon: <DollarOutlined />,
    },
    {
      key: 5,
      title: 'Distribution',
      content:
        <MobileForm
          layout='vertical'
        >
          <MobileForm.Item
            name='distribution'
            label='When will you distribute the incentives?'
          >
            <Selector
              columns={2}
              options={distributionOptions}
              defaultValue={['1']}
              onChange={(arr, extend) => console.log(arr, extend.items)}
            />
          </MobileForm.Item>
        </MobileForm>,
      icon: <DeploymentUnitOutlined />,
    },
  ];

  const next = () => {
    if(current === steps.length - 2 && budget === 0) {
      navigate("/poll_config");
    } else {
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const contentStyle: React.CSSProperties = {

  };

  return (
    <section>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative bg-white dark:bg-black">
        {/* Hero content */}
        <div className="relative pt-32 pb-10 md:pt-40 md:pb-16">
          <div className='mb-10' style={contentStyle}>{steps[current].content}</div>
          {/* Mobile menu */}
          <div className="md:hidden">
            <MobileSteps current={current}>
              {steps.map((item) =>
                <Step title={item.title} icon={item.icon} />
              )}
            </MobileSteps>
          </div>
          <div>
            <div className='dark:text-white' style={{ justifyItems: "center"}}>
              {/* <div>
                {current > 0 && (
                  <MobileButton
                    block
                    fill='outline'
                    className='mb-4'
                    size='large'
                    onClick={() => prev()}
                  >
                    Previous
                  </MobileButton>
                )}
              </div> */}
              <div>
                {current < steps.length - 1 && (
                  <MobileButton
                    block
                    className='mb-4'
                    color='primary' size='large'
                    onClick={() => next()}
                  >
                    Next
                  </MobileButton>
                )}
              </div>
              <div>
                {current === steps.length - 1 && (
                  <MobileButton
                    block
                    color='primary' size='large'
                    className='mb-4'
                    onClick={() => navigate("/poll_config")}
                    >
                    Done
                  </MobileButton>
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default PollWizardSteps;