import { styled } from "styled-components"

const Wrapper = styled.div``

const DynamicRatings = styled.div`
  display: flex;
  flex-direction: row-reverse;
  font-size: 2.25rem;
  line-height: 2.5rem;
  justify-content: space-around;
  padding: 0 0.2em;
  text-align: center;
  width: 5rem;

  & * {
    margin-left: 0.5rem;
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem;
  }

  & :checked ~ label {
    -webkit-text-fill-color: gold;
  }
  & label:hover,
  & label:hover ~ label {
    -webkit-text-fill-color: #fff58c;
  }
  & input {
    display: none;
  }
  & label {
    -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
    -webkit-text-stroke-width: 1.3px;
    -webkit-text-stroke-color: #2b2a29;
    cursor: pointer;
  }
`

const StaticStarRatings = styled.div`
  margin: 0 auto;
  color: #aaa9a9;
  position: relative;
  unicode-bidi: bidi-override;
  width: max-content;
  -webkit-text-fill-color: transparent; /* Will override color (regardless of order) */
  -webkit-text-stroke-width: 1.3px;
  -webkit-text-stroke-color: #2b2a29;

  & label:hover,
  & label:hover ~ label {
    -webkit-text-fill-color: #fff58c;
  }
  & .star-ratings-fill {
    color: #fff58c;
    padding: 0;
    position: absolute;
    z-index: 1;
    display: flex;
    top: 0;
    left: 0;
    overflow: hidden;
    -webkit-text-fill-color: gold;
    margin-left: 0.5rem;
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem;
  }
  & .star-ratings-base {
    margin-left: 0.5rem;
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem;
    z-index: 0;
    padding: 0;
    margin-left: 0.5rem;
    font-size: 1.125rem; /* 18px */
    line-height: 1.75rem;
  }
`

export default function Rating({ change, value, staticRating }: any) {
  return (
    <Wrapper>
      {staticRating ? (
        <StaticStarRatings>
          <div
            className='star-ratings-fill'
            style={{ width: value * 18 + "%" }}
            // style={{ width: value * 20 + 1.5 + "%" }}
          >
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
          <div className='star-ratings-base'>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>
        </StaticStarRatings>
      ) : (
        <DynamicRatings onChange={change}>
          <input type='radio' id='5-stars' name='rating' value='5' />
          <label htmlFor='5-stars'>★</label>
          <input type='radio' id='4-stars' name='rating' value='4' />
          <label htmlFor='4-stars'>★</label>
          <input type='radio' id='3-stars' name='rating' value='3' />
          <label htmlFor='3-stars'>★</label>
          <input type='radio' id='2-stars' name='rating' value='2' />
          <label htmlFor='2-stars'>★</label>
          <input type='radio' id='1-star' name='rating' value='1' />
          <label htmlFor='1-star'>★</label>
        </DynamicRatings>
      )}
    </Wrapper>
  )
}
