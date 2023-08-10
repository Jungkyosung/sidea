const NavQuick = (props) => {

  const handlerNavOn = props.handlerNavOn;

  return (
    <>
      <div onClick={handlerNavOn}>나는 네비퀵</div>
    </>
  )
}
export default NavQuick;