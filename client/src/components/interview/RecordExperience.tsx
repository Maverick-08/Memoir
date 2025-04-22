

const RecordExperience = ({activatePreviousSection}:{activatePreviousSection:(x:boolean) => void}) => {
  return (
    <div>
      <p>Record Experience</p>
      <div onClick={()=>activatePreviousSection(false)}></div>
    </div>
  )
}

export default RecordExperience
