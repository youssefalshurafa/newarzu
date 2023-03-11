import { NextResponse } from 'next/server';

export default function middleware(req) {
  let token = req.cookies.get('jwt');
  let url = req.url;
  let user = req.cookies.get('username');
  if (token && url.includes('/login')) {
    return NextResponse.redirect(`http://localhost:3000/profile/${user.value}`);
  }
  if (!token && url.includes('/profile')) {
    return NextResponse.redirect('http://localhost:3000/');
  }
}
