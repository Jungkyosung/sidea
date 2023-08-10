const Nav = (props) => {

  const handlerNavOff = props.handlerNavOff;

  return (
    <>
      <div onClick={handlerNavOff}>나 네비</div>
    </>
  )
}
export default Nav;